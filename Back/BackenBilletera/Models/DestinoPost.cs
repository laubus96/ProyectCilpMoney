using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackenBilletera.Models
{
    public class DestinoPost
    {
        public int idUserOrigen { get; set; }
        public string alias { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string email { get; set; }
    }
}