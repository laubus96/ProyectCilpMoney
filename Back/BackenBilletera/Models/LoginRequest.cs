using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public int id { get; set; }

        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
       
    }
}