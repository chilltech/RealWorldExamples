using core.Models.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Services;
using System.Text.Encodings.Web;
using System.Web;
using core.EntityFrameworkCore.Engines;
using Microsoft.AspNetCore.Authentication;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IUserEngine _userEngine;


        public AccountController(
            IConfiguration config,
            IEmailSenderService emailSenderService,
            IUserEngine userEngine)
        {
            _config = config;
            _userEngine = userEngine;
            _config = config;
            _emailSenderService = emailSenderService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> GenerateAuthenticationToken([FromBody] LoginModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = AddErrors() });
            }
            var result = await _userEngine.LoginGenerateToken(model);

            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                {
                    return StatusCode(403, new { message = "User account locked out." });
                }

                return BadRequest(new { message = AddErrors() });
            }

            return Ok(new { token = CreateToken(result.Id) });
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = AddErrors() });
            }

            var result = await _userEngine.CreateUser(model);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = result.StatusMessage });
            }

            var clientPath = _config["clientSite"];

            if (!string.IsNullOrEmpty(clientPath))
            {
                var encodedCode = UrlEncoder.Default.Encode(HttpUtility.HtmlEncode(result.EmailCode));
                var callbackUrl = $"{Request.Scheme}://{clientPath}/confirmemail?id={result.UserId}&code={encodedCode}";
                await _emailSenderService.SendEmailConfirmationAsync(result.Email, callbackUrl);
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string id, string code)
        {
            if (id == null || code == null)
            {
                return BadRequest(new { message = "Missing Code or Id" });
            }
            var decodedCode = HttpUtility.HtmlDecode(code);

            var result = await _userEngine.ConfirmEmail(id, decodedCode);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = result.StatusMessage });
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("Connect")]
        public async Task ExternalLogin(string provider, string returnUrl = null)
        {
            returnUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = await _userEngine.ExterAuthConfigureProperties(provider, returnUrl);

            await HttpContext.ChallengeAsync(provider, properties);

        }

        [AllowAnonymous]
        [HttpGet("ExternalLoginCallback")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            var result = await _userEngine.ExterLogin();

            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                {
                    return StatusCode(403, new { message = "User account locked out." });

                }

                if (result.RequiresTwoFactor)
                {
                    return BadRequest(new { message = "User account locked out." });

                }

                result = await _userEngine.CreateExterLoginUser(new ExterLoginConfirmModel() { Email = result.Email });

                if (!result.Succeeded)
                {
                    if (result.IsLockedOut)
                    {
                        return StatusCode(403, new { message = "User account locked out." });
                    }

                    return BadRequest(new { message = result.StatusMessage });
                }

            }

            var token = CreateToken(result.Id);

            return Redirect(returnUrl + "?token=" + token);
        }

        // GET api/Account/UserInfo
        [HttpGet("UserInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var user = await _userEngine.Get(User);

            return Ok(new ProfileModel()
            {
                Email = user.Email,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName
            });
        }


        #region Helpers
        private string CreateToken(string userId)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Tokens:Issuer"],
                _config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #endregion
    }
}
