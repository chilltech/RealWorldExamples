namespace core.Models.User
{
    public class RegisterEmailCodeModel : BaseModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string EmailCode { get; set; }
    }
}
