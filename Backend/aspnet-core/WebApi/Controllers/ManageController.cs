using core.Models.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using WebApi.Services;
using core.EntityFrameworkCore.Engines;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ManageController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IUserEngine _userEngine;


        public ManageController(
            IConfiguration config,
            IEmailSenderService emailSenderService,
            IUserEngine userEngine)
        {
            _config = config;
            _userEngine = userEngine;
            _config = config;
            _emailSenderService = emailSenderService;
        }

        [HttpPatch("Update")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] ProfileModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = AddErrors() });
            }

            var result = await _userEngine.Update(User, model);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = result.StatusMessage });
            }

            return Ok(result);
        }

        [HttpPost("ChgPassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChgPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = AddErrors() });
            }

            var result = await _userEngine.ChangePassword(User, model);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = result.StatusMessage });
            }

            return Ok(result);
        }
    }
}
