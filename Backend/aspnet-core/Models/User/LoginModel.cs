namespace core.Models.User
{
    using System.ComponentModel.DataAnnotations;

    public class LoginModel : BaseUserModel
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
