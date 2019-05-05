using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

using Microsoft.AspNetCore.Identity;

namespace core.EntityFrameworkCore.Engines
{


    public class BaseEngine : IBaseEngine
    {
        protected string AddErrors(IdentityResult result)
        {
            StringBuilder errors = new StringBuilder();

            errors.AppendJoin('|', result.Errors.Select(x => x.Description));

            return errors.ToString();
        }

    }
}
