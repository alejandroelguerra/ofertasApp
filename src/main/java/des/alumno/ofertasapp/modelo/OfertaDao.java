package des.alumno.ofertasapp.modelo;

import java.util.List;
import java.util.Optional;


import des.alumno.ofertasapp.entidades.Oferta;

public interface OfertaDao extends DaoGenerico<Oferta> {

	//public int save (Oferta oferta);
	public List<Oferta> findAll();
	//public Optional<Oferta> findById(int id);
	//public int delete(Oferta oferta);
	public List<Oferta>findAllByNombreLike(String patronNombre);
	
	public List<Oferta>findAllByPrioridad(String prioridad);
}
