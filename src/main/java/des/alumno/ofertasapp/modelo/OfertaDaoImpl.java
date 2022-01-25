package des.alumno.ofertasapp.modelo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import des.alumno.ofertasapp.entidades.Oferta;


@Repository
public class OfertaDaoImpl extends DaoGenericoImpl<Oferta> implements OfertaDao  {

	@Autowired
	private JdbcTemplate jdbc;
	
	/*@Override
	public int save(Oferta oferta) {
		// TODO Auto-generated method stub
		return jdbc.update("insert into oferta(nombre,precio,fecha,prioridad,hiperenlace,descripcion) values (?,?,?,?,?,?)",oferta.getNombre()
				,oferta.getPrecio(),oferta.getFecha(),oferta.getPrioridad(),oferta.gethiperenlace(),oferta.getDescripcion());
	}
*/
	@Override
	public List<Oferta> findAll() {
		// TODO Auto-generated method stub
		return jdbc.query("select * from oferta", (rs, rowNum) -> new Oferta(rs.getInt("id"), rs.getString("nombre"), 
				rs.getFloat("precio"), rs.getDate("fecha").toLocalDate(), rs.getString("prioridad"),rs.getString("hiperenlace"),rs.getString("descripcion")));
	}

	/*@SuppressWarnings("deprecation")
	@Override
	public Optional<Oferta> findById(int id) {
		return jdbc.queryForObject("select * from oferta where id = ?", new Object[] { id }, (rs,
				rowNum) -> Optional.of(new Oferta(rs.getInt("id"), rs.getString("nombre"), 
						rs.getFloat("precio"), rs.getDate("fecha").toLocalDate(), rs.getString("prioridad"),rs.getString("hiperenlace"),rs.getString("descripcion"))));
	}*/
/*
	@Override
	public int delete(Oferta oferta) {
		
		return jdbc.update("delete from oferta where id = ?", oferta.getId());
	}
*/
	@Override
	public List<Oferta> findAllByNombreLike(String patronNombre) {
		// TODO Auto-generated method stub
		return jdbc.query("select * from oferta where nombre like ?", (rs, rowNum)-> new Oferta(rs.getInt("id"), 
				rs.getString("nombre"), rs.getFloat("precio"), rs.getDate("fecha").toLocalDate(),  rs.getString("prioridad"),rs.getString("hiperenlace"),rs.getString("descripcion")), 
				"%"+patronNombre+"%");
	}

	@Override
	public List<Oferta> findAllByPrioridad(String prioridad) {
		return jdbc.query("select * from oferta where prioridad like ?", (rs, rowNum)-> new Oferta(rs.getInt("id"), 
				rs.getString("nombre"), rs.getFloat("precio"), rs.getDate("fecha").toLocalDate(),  rs.getString("prioridad"),rs.getString("hiperenlace"),rs.getString("descripcion")), 
				"%"+prioridad+"%");
	}

}
