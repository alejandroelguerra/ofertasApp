package des.alumno.ofertasapp.servicios;

import java.util.ArrayList;


import des.alumno.ofertasapp.entidades.Oferta;



public interface OfertaServicio {

	public Oferta guardar(Oferta oferta);
	
	public Oferta actualizar(Oferta oferta);
	
	public ArrayList<Oferta> listarTodas();
	
	public Oferta buscarPorId(int id);
		
	public Oferta borrarPorId(int id);
	
	public ArrayList<Oferta> buscarPorPatronDeNombre(String patron);
	public ArrayList<Oferta> buscarPorPatronDePrioridad(String prioridad);
}
