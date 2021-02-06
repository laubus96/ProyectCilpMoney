using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class MovimientosPorUsuario
    {
        public string Apellido { get; set; }
        public string movimiento { get; set; }
        public int monto { get; set; }
        public DateTime fecha { get; set; }
        public int numComprobante { get; set; }
        public string ApellidoDestino { get; set; }
         
    }
}