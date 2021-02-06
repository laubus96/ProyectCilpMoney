using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BCrypt.Net;



namespace BackenBilletera.Models
{
    public class GestorLogin
    {
        public bool validarLogin(LoginRequest login)
        {
            
            DBbilleteraEntities db = new DBbilleteraEntities();


            var lst = from d in db.Usuario
                      where d.nomUsuario == login.Username
                      select d.password;
            var passwordUser = lst.First();
            if ( BCrypt.Net.BCrypt.Verify(login.password, passwordUser))
            {

                return true;
            }
            else
            {
                return false;
            }

        }
    }
}