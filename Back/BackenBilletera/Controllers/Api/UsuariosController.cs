using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BackenBilletera.Models;

namespace BackenBilletera.Controllers.Api
{
    public class UsuariosController : ApiController
    {
        private DBbilleteraEntities db = new DBbilleteraEntities();
        string urlDomain = "http://localhost:4200";

        // GET: api/Usuarios
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Usuario> GetUsuario()
        {
            return db.Usuario;
        }

        // GET: api/Usuarios/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult GetUsuario(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]

        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult PutUsuario( Email email1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token = GetSHA256(Guid.NewGuid().ToString());
            GetIdUsuario getUser = new GetIdUsuario();

            var idUsuario = getUser.obtenerUser(email1.email);
            var oUsuario = db.Usuario.Find(idUsuario);
            oUsuario.tokenMail = token;
            db.Entry(oUsuario).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                //enviar mail
                SendEmail(oUsuario.email, token);
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        // PUT: api/Usuarios/5

        [EnableCors(origins: "*", headers: "*", methods: "*")]

        [ResponseType(typeof(void))]
        [HttpPut]
        
        public IHttpActionResult PutUsuario(int id, Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Buscar usuario por id
            var current = db.Usuario.Find(id);

            try
            {
                current.nombre = usuario.nombre;
                current.alias = usuario.alias;
                
                current.apellido = usuario.apellido;
                current.dni = usuario.dni;
                current.telefono = usuario.telefono;
                current.email = usuario.email;
                current.nomUsuario = usuario.nomUsuario;
                current.password = usuario.password;
                current.idPais = usuario.idPais;
                current.idProvincia = usuario.idProvincia;
                current.idLocalidad = usuario.idLocalidad;
                current.calle = usuario.calle;
                current.altura = usuario.altura;


                db.Usuario.Attach(current);
                db.Entry(current).State = EntityState.Modified;
                db.SaveChanges();
                return StatusCode(HttpStatusCode.OK);
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Usuarios
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Usuario))]

        public IHttpActionResult PostUsuario(Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                
                //var pass = BCrypt.Net.BCrypt.HashPassword(usuario.password);
                var oUsuario = new Usuario();
                oUsuario.nombre = usuario.nombre;
                oUsuario.alias = usuario.alias;
                
                oUsuario.apellido = usuario.apellido;
                oUsuario.dni = usuario.dni;
                oUsuario.telefono = usuario.telefono;
                oUsuario.email = usuario.email;
                oUsuario.nomUsuario = usuario.nomUsuario;
                oUsuario.password = usuario.password;
                oUsuario.idPais = usuario.idPais;
                oUsuario.idProvincia = usuario.idProvincia;
                oUsuario.idLocalidad = usuario.idLocalidad;
                oUsuario.calle = usuario.calle;
                oUsuario.altura = usuario.altura;


                db.Usuario.Add(oUsuario);
                db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                
            }

            return CreatedAtRoute("DefaultApi", new { id = usuario.idUsuario }, usuario);
        }

        // DELETE: api/Usuarios/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult DeleteUsuario(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            db.Usuario.Remove(usuario);
            db.SaveChanges();

            return Ok(usuario);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsuarioExists(int id)
        {
            return db.Usuario.Count(e => e.idUsuario == id) > 0;
        }


        /* -------------------HELPERS--------------------*/
        public static string GetSHA256(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
        private void SendEmail(string EmailDestino, string token)
        {
            string EmailOrigen = "laubus1234@gmail.com";
            string Contraseña = "ABcd1234";
            string url = urlDomain + "/recuperacion/" + token;
            MailMessage oMailMessage = new MailMessage(EmailOrigen, EmailDestino, "Recuperación de contraseña",
                "<p>Correo para recuperación de contraseña</p><br>" +
                "<a href='" + url + "'>Click para recuperar</a>");

            oMailMessage.IsBodyHtml = true;

            SmtpClient oSmtpClient = new SmtpClient("smtp.gmail.com");
            oSmtpClient.EnableSsl = true;
            oSmtpClient.UseDefaultCredentials = false;
            oSmtpClient.Port = 587;
            oSmtpClient.Credentials = new System.Net.NetworkCredential(EmailOrigen, Contraseña);

            oSmtpClient.Send(oMailMessage);

            oSmtpClient.Dispose();
        }
    }
}