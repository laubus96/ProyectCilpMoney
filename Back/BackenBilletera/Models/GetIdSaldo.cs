using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class GetIdSaldo
    {
        public int obtenerIdSaldo(int id)
        {
            DBbilleteraEntities db = new DBbilleteraEntities();
            var lst = from d in db.Saldo
                      where d.idUsuario == id
                      select d.idSaldo;
            return lst.First();
        }

        
    }
}