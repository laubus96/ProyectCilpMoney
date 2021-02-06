using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class GetIdDestino
    {
        DBbilleteraEntities db = new DBbilleteraEntities();
        public int ObtenerId(string alias)
        {
            
            var lst = from d in db.Usuario
                      where d.alias == alias
                      select d.idUsuario;
            return lst.First();
        }
        public int ObtenerIdDestino(int id)
        {
            var lst = from d in db.Destinos
                      where d.idUserOrigen == id
                      select d.idUserDestino;
            return lst.First();

        }

        public Usuario destinoOrNo(int id, int user)
        {
            if (id == 3)
            {
                GetIdDestino getIdDestino = new GetIdDestino();
                var idDestino = getIdDestino.ObtenerIdDestino(user);
                var currentDestino = db.Usuario.Find(idDestino);
                return currentDestino;

            }
            else
            {

                var currentDestino = db.Usuario.Find(user);
                return currentDestino;
            }
            
        }

    }
}