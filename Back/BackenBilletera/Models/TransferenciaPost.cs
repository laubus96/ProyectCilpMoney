using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class TransferenciaPost
    {
        public int idUserDestino { get; set; }
        public string email { get; set; }
        public int monto { get; set; }
    }
}