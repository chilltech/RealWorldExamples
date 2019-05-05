using System.ComponentModel.DataAnnotations;

namespace core.Models.User
{

    public class ProfileModel : BaseUserModel
    {
        public virtual string Id { get; set; }

        public virtual string Username { get; set; }

        public virtual string FirstName { get; set; }

        public virtual string LastName { get; set; }

        public virtual bool IsEmailConfirmed { get; set; }

        [Phone]
        [Display(Name = "Phone number")]
        public virtual string PhoneNumber { get; set; }

        public virtual bool IsLockedOut { get; set; }
        public virtual bool RequiresTwoFactor { get; set; }

    }
}
