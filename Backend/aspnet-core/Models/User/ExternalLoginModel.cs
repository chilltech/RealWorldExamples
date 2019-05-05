using System.ComponentModel.DataAnnotations;

namespace core.Models.User
{
    public enum ExtLoginResult { HasLogin, Confirm, LockedOut, Failed }

    public class ExternalLoginModel : BaseUserModel
    {
        [EmailAddress]
        public virtual string Email { get; set; }

        public virtual ExtLoginResult Result { get; set; }

        public virtual string ReturnUrl { get; set; }
    }
}
