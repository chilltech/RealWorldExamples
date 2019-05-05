using System.ComponentModel.DataAnnotations;

namespace core.Models.User
{
    public class ExterLoginModel : ProfileModel
    {
        public virtual string Provider { get; set; }
        public virtual string ReturnUrl { get; set; }
    }
}
