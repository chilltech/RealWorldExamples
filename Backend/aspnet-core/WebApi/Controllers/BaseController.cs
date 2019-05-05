using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class BaseController : Controller
    {
        protected string AddErrors()
        {
            string errors = string.Join('|', ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            return errors;
        }
    }
}
