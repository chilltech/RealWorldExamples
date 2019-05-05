using core.EntityFrameworkCore.Entities;
using core.Models.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.Text;

namespace core.EntityFrameworkCore.Engines
{

    using core.Models;

    public class UserEngine : BaseEngine, IUserEngine
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserEngine(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public virtual async Task<TokenValuesModel> LoginGenerateToken(LoginModel User)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(User.Email);

            if (user == null)
            {
                return new TokenValuesModel
                {
                    Succeeded = false,
                    StatusMessage = "Failed to retrieve user"
                };
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, User.Password, false);

            if (!result.Succeeded)
            {
                return new TokenValuesModel
                {
                    Succeeded = false,
                    StatusMessage = "",
                    IsLockedOut = result.IsLockedOut,
                    RequiresTwoFactor = result.RequiresTwoFactor
                };
            }

            return new TokenValuesModel
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Succeeded = true,
                StatusMessage = ""
            };
        }

        public virtual async Task<ProfileModel> GetProfile(BaseUserModel User)
        {

            ApplicationUser user = null;

            if (!string.IsNullOrWhiteSpace(User.Email))
            {
                user = await _userManager.FindByEmailAsync(User.Email);
            }
            else if (!string.IsNullOrWhiteSpace(User.Id))
            {
                user = await _userManager.FindByIdAsync(User.Id);
            }

            if (user == null)
            {
                return new ProfileModel
                {
                    Succeeded = false,
                    StatusMessage = "Failed to retrieve user"
                };
            }
            return new ProfileModel
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Succeeded = true,
                StatusMessage = ""
            };
        }

        public virtual async Task<RegisterEmailCodeModel> CreateUser(RegisterModel model)
        {
            RegisterEmailCodeModel response = new RegisterEmailCodeModel();

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return new RegisterEmailCodeModel()
                {
                    Succeeded = false,
                    StatusMessage = AddErrors(result)
                };
            }

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            return new RegisterEmailCodeModel()
            {
                Succeeded = true,
                EmailCode = code,
                UserId = user.Id,
                Email = user.Email
            };
        }

        public virtual async Task<BaseModel> ConfirmEmail(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ProfileModel
                {
                    Succeeded = false,
                    StatusMessage = $"Unable to load user with ID '{userId}'."
                };
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            return new ProfileModel()
            {
                Succeeded = result.Succeeded,
                StatusMessage = AddErrors(result)
            };
        }

        public virtual async Task<ProfileModel> Get(ClaimsPrincipal User)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return new ProfileModel
                {
                    Succeeded = false,
                    StatusMessage = $"Unable to load user with ID '{_userManager.GetUserId(User)}'."
                };
            }

            return new ProfileModel
            {
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IsEmailConfirmed = user.EmailConfirmed,
                Succeeded = true,
                StatusMessage = "Succeededful"
            };
        }

        public virtual async Task<BaseModel> Update(ClaimsPrincipal User, ProfileModel model)
        {
            //ApplicationUser user = await _userManager.FindByEmailAsync(model.Email);
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return new ProfileModel
                {
                    Succeeded = false,
                    StatusMessage = $"Unable to load user with ID '{_userManager.GetUserId(User)}'."
                };

            }

            if (user.UserName != model.Username)
            {
                user.UserName = model.Username;
            }

            if (user.Email != model.Email)
            {
                user.Email = model.Email;
            }

            if (user.PhoneNumber != model.PhoneNumber)
            {
                user.Email = model.Email;
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return new BaseModel
                {
                    Succeeded = false,
                    StatusMessage = AddErrors(result)
                };

            }

            return new BaseModel
            {
                Succeeded = true,
                StatusMessage = "Succeeded"
            };
        }

        public virtual async Task<BaseModel> ChangePassword(ClaimsPrincipal User, ChgPasswordModel model)
        {
            //ApplicationUser user = await _userManager.FindByEmailAsync(model.Email);
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return new ProfileModel
                {
                    Succeeded = false,
                    StatusMessage = $"Unable to load user with ID '{_userManager.GetUserId(User)}'."
                };

            }

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return new BaseModel
                {
                    Succeeded = false,
                    StatusMessage = AddErrors(result)
                };

            }

            return new BaseModel
            {
                Succeeded = true,
                StatusMessage = "Succeeded"
            };
        }

        public virtual async Task<AuthenticationProperties> ExterAuthConfigureProperties(string provider, string redirectUrl)
        {
            return _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        }

        public virtual async Task<ExterLoginModel> ExterLogin(string redirectUrl = null)
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            if (info == null)
            {
                return new ExterLoginModel
                {
                    Succeeded = false,
                    StatusMessage = "Unable to load external login."
                };
            }

            var email = info.Principal.FindFirstValue(ClaimTypes.Email);

            // Sign in user with existing account using external login provider.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (!result.Succeeded)
            {
                return new ExterLoginModel
                {
                    Email = email,
                    Succeeded = false,
                    StatusMessage = "",
                    Provider = info.LoginProvider,
                    IsLockedOut = result.IsLockedOut,
                    RequiresTwoFactor = result.RequiresTwoFactor
                };
                //var createResult = await _userManager.CreateAsync(new ApplicationUser()
                //{
                //    UserName = email,
                //    Email = email,
                //    EmailConfirmed = true
                //});

                //if (!createResult.Succeeded)
                //{
                //    return new TokenValuesModel
                //    {
                //        Succeeded = false,
                //        StatusMessage = AddErrors(createResult)
                //    };
                //}
            }

            ApplicationUser user = await _userManager.FindByEmailAsync(email);

            //_logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
            return new ExterLoginModel
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Succeeded = true,
                StatusMessage = $"User logged in with {info.LoginProvider} provider."
            };


        }

        public virtual async Task<ExterLoginModel> CreateExterLoginUser(ExterLoginConfirmModel model)
        {
            // Get the information about the user from the external login provider
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return new ExterLoginModel
                {
                    Succeeded = false,
                    StatusMessage = "Unable to load external login."
                };
            }
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return new ExterLoginModel()
                {
                    Succeeded = false,
                    StatusMessage = AddErrors(result)
                };
            }

            result = await _userManager.AddLoginAsync(user, info);
            if (!result.Succeeded)
            {
                return new ExterLoginModel()
                {
                    Succeeded = false,
                    StatusMessage = AddErrors(result)
                };
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            //_logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
            return new ExterLoginModel
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Succeeded = true,
                StatusMessage = $"User logged in with {info.LoginProvider} provider."
            };
        }
    }
}