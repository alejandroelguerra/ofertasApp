package des.alumno.ofertasapp.servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.modelo.OfertaDao;

@Transactional
@Service
public class OfertaServiceImpl implements OfertaServicio{

	@Autowired
	private OfertaDao dao;
	
	@Override
	public Oferta guardar(Oferta oferta) {
		// TODO Auto-generated method stub
		return dao.crear(oferta);
	}

	@Override
	public ArrayList<Oferta> listarTodas() {
		// TODO Auto-generated method stub
		return (ArrayList<Oferta>) dao.findAll();
	}

	@Override
	public Oferta borrarPorId(int id) {
		Optional<Oferta> optional = Optional.of(dao.buscar(id));
		
		if(optional.isPresent()) {
			
			dao.borrar(optional.get().getId());
			
		}
		
		return optional.orElse(new Oferta(-1, "", 0, null, "","",""));
	}

	@Override
	public Oferta buscarPorId(int id) {
		Optional<Oferta> optional=Optional.of(dao.buscar(id));
		return optional.orElse(new Oferta(-1, "", 0, null, "","",""));
	}

	@Override
	public ArrayList<Oferta> buscarPorPatronDeNombre(String patron) {
		// TODO Auto-generated method stub
		return (ArrayList<Oferta>) dao.findAllByNombreLike(patron);
	}

	@Override
	public ArrayList<Oferta> buscarPorPatronDePrioridad(String prioridad) {
		// TODO Auto-generated method stub
		return (ArrayList<Oferta>) dao.findAllByPrioridad(prioridad);
	}

	@Override
	public Oferta actualizar(Oferta oferta) {
		// TODO Auto-generated method stub
		return dao.actualizar(oferta);
	}

}
