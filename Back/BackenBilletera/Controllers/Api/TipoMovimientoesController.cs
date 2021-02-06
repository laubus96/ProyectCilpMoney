using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackenBilletera.Models;

namespace BackenBilletera.Controllers.Api
{
    public class TipoMovimientoesController : ApiController
    {
        private DBbilleteraEntities db = new DBbilleteraEntities();

        // GET: api/TipoMovimientoes
        public IQueryable<TipoMovimiento> GetTipoMovimiento()
        {
            return db.TipoMovimiento;
        }

        // GET: api/TipoMovimientoes/5
        [ResponseType(typeof(TipoMovimiento))]
        public IHttpActionResult GetTipoMovimiento(int id)
        {
            TipoMovimiento tipoMovimiento = db.TipoMovimiento.Find(id);
            if (tipoMovimiento == null)
            {
                return NotFound();
            }

            return Ok(tipoMovimiento);
        }

        // PUT: api/TipoMovimientoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipoMovimiento(int id, TipoMovimiento tipoMovimiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoMovimiento.idTipoMovimento)
            {
                return BadRequest();
            }

            db.Entry(tipoMovimiento).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoMovimientoExists(id))
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

        // POST: api/TipoMovimientoes
        [ResponseType(typeof(TipoMovimiento))]
        public IHttpActionResult PostTipoMovimiento(TipoMovimiento tipoMovimiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoMovimiento.Add(tipoMovimiento);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoMovimiento.idTipoMovimento }, tipoMovimiento);
        }

        // DELETE: api/TipoMovimientoes/5
        [ResponseType(typeof(TipoMovimiento))]
        public IHttpActionResult DeleteTipoMovimiento(int id)
        {
            TipoMovimiento tipoMovimiento = db.TipoMovimiento.Find(id);
            if (tipoMovimiento == null)
            {
                return NotFound();
            }

            db.TipoMovimiento.Remove(tipoMovimiento);
            db.SaveChanges();

            return Ok(tipoMovimiento);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoMovimientoExists(int id)
        {
            return db.TipoMovimiento.Count(e => e.idTipoMovimento == id) > 0;
        }
    }
}