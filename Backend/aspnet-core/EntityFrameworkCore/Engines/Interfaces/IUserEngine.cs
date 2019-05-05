using core.Models;
using core.Models.User;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace core.EntityFrameworkCore.Engines
{
    public interface IUserEngine : IBaseEngine
    {
        Task<TokenValuesModel> LoginGenerateToken(LoginModel User);
        Task<ProfileModel> GetProfile(BaseUserModel User);
        Task<RegisterEmailCodeModel> CreateUser(RegisterModel model);
        Task<ProfileModel> Get(ClaimsPrincipal User);
        Task<BaseModel> Update(ClaimsPrincipal User, ProfileModel model);
        Task<BaseModel> ConfirmEmail(string userId, string code);
        Task<BaseModel> ChangePassword(ClaimsPrincipal User, ChgPasswordModel model);
        Task<AuthenticationProperties> ExterAuthConfigureProperties(string provider, string redirectUrl);
        Task<ExterLoginModel> ExterLogin(string redirectUrl = null);
        Task<ExterLoginModel> CreateExterLoginUser(ExterLoginConfirmModel model);
    }
}
