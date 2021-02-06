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
    public class LocalidadsController : ApiController
    {
        private DBbilleteraEntities db = new DBbilleteraEntities();

        // GET: api/Localidads

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Localidad> GetLocalidad()
        {
            return db.Localidad;
        }

        // GET: api/Localidads/5
        
        [ResponseType(typeof(Localidad))]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetLocalidad(int id)
        {
            var localidades = db.Localidad.Where(x => x.idProvincia == id).ToList();
            return Ok(localidades);
        }
        

        // PUT: api/Localidads/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLocalidad(int id, Localidad localidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != localidad.idLocalidad)
            {
                return BadRequest();
            }

            db.Entry(localidad).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalidadExists(id))
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

        // POST: api/Localidads
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Localidad))]
        public IHttpActionResult PostLocalidad(Localidad localidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Localidad.Add(localidad);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = localidad.idLocalidad }, localidad);
        }

        // DELETE: api/Localidads/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Localidad))]
        public IHttpActionResult DeleteLocalidad(int id)
        {
            Localidad localidad = db.Localidad.Find(id);
            if (localidad == null)
            {
                return NotFound();
            }

            db.Localidad.Remove(localidad);
            db.SaveChanges();

            return Ok(localidad);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocalidadExists(int id)
        {
            return db.Localidad.Count(e => e.idLocalidad == id) > 0;
        }
    }
}