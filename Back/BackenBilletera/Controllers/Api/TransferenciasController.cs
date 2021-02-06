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
    public class TransferenciasController : ApiController
    {
        private DBbilleteraEntities db = new DBbilleteraEntities();

        // Traer las transferencias totales
        // GET: api/Transferencias
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Transferencia> GetTransferencia()
        {
            return db.Transferencia;
        }

        // Traer las transferencias del usuario con el id pasado
        // GET: api/Transferencias/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Transferencia))]
        public IHttpActionResult GetTransferencia(int id)
        {
            Transferencia transferencia = db.Transferencia.Find(id);
            if (transferencia == null)
            {
                return NotFound();
            }

            return Ok(transferencia);
        }

        // Esto no se usaria, una transferencia hecha no deberia ser modificada
        // PUT: api/Transferencias/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransferencia(int id, Transferencia transferencia)
        {
            /*if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transferencia.idTransferencia)
            {
                return BadRequest();
            }

            db.Entry(transferencia).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransferenciaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }*/

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Transferencias
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Transferencia))]
        public IHttpActionResult PostTransferencia(int id, TransferenciaPost transferenciaPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            // Primero restamos el saldo al usuario actual
            // Buscar saldo por id de usuario
            GetIdSaldo getIdSaldoOrigen = new GetIdSaldo();
            var IdSaldoOrigen = getIdSaldoOrigen.obtenerIdSaldo(id);
            var current = db.Saldo.Find(IdSaldoOrigen);
            var oTranferencia = new Transferencia();
            try
            {
                
                oTranferencia.idDestino = transferenciaPost.idUserDestino;
                oTranferencia.idMoneda = 1;
                oTranferencia.idUsuario = id;
                oTranferencia.fecha = DateTime.Now;
                oTranferencia.monto = transferenciaPost.monto;

                db.Transferencia.Add(oTranferencia);
                db.SaveChanges();
                

                // Restar el monto que le estoy pasando al saldo actual del usuario
                // Luego, actualizar en la base
                current.monto = current.monto - transferenciaPost.monto;
                db.Saldo.Attach(current);
                db.Entry(current).State = EntityState.Modified;
                db.SaveChanges();
                GetIdSaldo getIdSaldoDestino = new GetIdSaldo();
                var IdSaldoDestino = getIdSaldoDestino.obtenerIdSaldo(transferenciaPost.idUserDestino);

                // Luego se lo agregamos al usuario destino
                
                current = db.Saldo.Find(IdSaldoDestino);
                current.monto = current.monto + transferenciaPost.monto;
                db.Saldo.Attach(current);
                db.Entry(current).State = EntityState.Modified;
                db.SaveChanges();
                return StatusCode(HttpStatusCode.OK);
                

            }
            catch (DbUpdateConcurrencyException)
            {

            }
            // Guardamos la transferencia asi podemos traerlas si queremos
            


            return CreatedAtRoute("DefaultApi", new { id = oTranferencia.idTransferencia }, oTranferencia);
        }

        // Esto no se usaria (solo si creamos el boton "Borrar Historial")
        // DELETE: api/Transferencias/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [ResponseType(typeof(Transferencia))]
        public IHttpActionResult DeleteTransferencia(int id)
        {
            Transferencia transferencia = db.Transferencia.Find(id);
            if (transferencia == null)
            {
                return NotFound();
            }

            db.Transferencia.Remove(transferencia);
            db.SaveChanges();

            return Ok(transferencia);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransferenciaExists(int id)
        {
            return db.Transferencia.Count(e => e.idTransferencia == id) > 0;
        }
    }
}