using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BackenBilletera.Models;

namespace BackenBilletera.Controllers.Api
{
    [Authorize]
    public class DestinosController : ApiController
    {
        private DBbilleteraEntities db = new DBbilleteraEntities();

        // GET: api/Destinos
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Destinos> GetDestinos()
        {
            return db.Destinos;
        }

        // GET: api/Destinos/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Destinos))]
        public IQueryable GetDestinos(int id)
        {
            var lstDestinos = db.Destinos.Where(x => x.idUserOrigen == id);
            return lstDestinos;
        }

        // PUT: api/Destinos/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDestinos(int id, Destinos destinos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != destinos.idUserDestino)
            {
                return BadRequest();
            }

            db.Entry(destinos).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DestinosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Destinos
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Destinos))]
        public IHttpActionResult PostDestinos(int id, DestinoPost destinoPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GetIdDestino getIdDestino = new GetIdDestino();
            var idDestino = getIdDestino.ObtenerId(destinoPost.alias);
            var oDestino = new Destinos();
            try
            {
                
                oDestino.idUserOrigen = id;
                oDestino.alias = destinoPost.alias;
                oDestino.nombre = destinoPost.nombre;
                oDestino.idUserDestino = idDestino;
                oDestino.apellido = destinoPost.apellido;
                oDestino.email = destinoPost.email;
                db.Destinos.Add(oDestino);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DestinosExists(oDestino.idUserDestino))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oDestino.idUserDestino }, oDestino);
        }

        // DELETE: api/Destinos/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Destinos))]
        public IHttpActionResult DeleteDestinos(int id)
        {
            Destinos destinos = db.Destinos.Find(id);
            if (destinos == null)
            {
                return NotFound();
            }

            db.Destinos.Remove(destinos);
            db.SaveChanges();

            return Ok(destinos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DestinosExists(int id)
        {
            return db.Destinos.Count(e => e.idUserDestino == id) > 0;
        }
    }
}