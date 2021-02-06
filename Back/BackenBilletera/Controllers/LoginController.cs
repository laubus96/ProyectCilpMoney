using BackenBilletera.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackenBilletera.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }


        [HttpPost]
        [Route("authenticate")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {

            
            if (login == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            GestorLogin gLogin = new GestorLogin();
            GetIdUsuario gUserId = new GetIdUsuario();
            bool isCredentialValid = gLogin.validarLogin(login);
            int getUserId = gUserId.obtenerId(login.Username);
            if (isCredentialValid)
            {
                var idString = getUserId.ToString();
                var token = TokenGenerator.GenerateTokenJwt(login.Username, idString);

                return Ok(new User(login.Username, token));
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
