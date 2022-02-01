package des.alumno.ofertasapp.controladores;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.servicios.OfertaServicio;

@Controller
public class OfertaController {

	@Autowired
	private OfertaServicio ofertaServicio;
	
	@ResponseBody
	@PostMapping(value = "/anadir")
	public ResponseEntity<Oferta> guardarOferta(@RequestBody Oferta oferta) {
		
		ResponseEntity<Oferta> resp;
		oferta.setFecha(LocalDate.now());
		//Oferta oferta = new Oferta(nombre, precio, fecha, prioridad, hipervinculo, descripcion);
		Oferta o =ofertaServicio.guardar(oferta);
		
		resp = new ResponseEntity<Oferta>(o,HttpStatus.OK);
		return resp;

	}/*
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/anadir")
	public Oferta crearOferta(@RequestBody Oferta oferta) {

		return ofertaServicio.guardar(new Oferta(oferta.getNombre(), oferta.getPrecio(),oferta.getPrioridad(),oferta.gethiperenlace(),
				oferta.getDescripcion()));
	}*/
	
	@ResponseBody
	@GetMapping(value = "/borrar/{id}")
	public ResponseEntity<Oferta> borrar(@PathVariable int id) {

		Optional<Oferta>opti =Optional.of(ofertaServicio.buscarPorId(id));
		ResponseEntity<Oferta> resp;
		if(opti.isPresent()) {
			Oferta o = ofertaServicio.borrarPorId(id);
			resp= new ResponseEntity<Oferta>(HttpStatus.ACCEPTED);
		}else {
			resp= new ResponseEntity<Oferta>(HttpStatus.BAD_REQUEST);
		}
		
			return resp;
	}
	
	/*@GetMapping(value = "/buscar")
	public String buscarPorPatronDeNombre(Model modelo, @RequestParam String patron) {

		ArrayList<Oferta> ofertas = ofertaServicio.buscarPorPatronDeNombre(patron);
		if (ofertas.isEmpty() || patron.equals("")) {
			return "redirect:/";
		} else {
			modelo.addAttribute("oferta", ofertas);
			return "index";
		}

	}*/
	@GetMapping(value = "/filtrar")
	public List<Oferta> buscarPorPatronPrioridad( @RequestParam String prioridad) {

			return ofertaServicio.buscarPorPatronDePrioridad(prioridad);
		
			
	}
	@GetMapping(value = "/oferta/{id}")
	public String buscarProductoPorId(Model modelo, @PathVariable int id) {

		Oferta o = ofertaServicio.buscarPorId(id);
		if (o.getId() != -1) {
			modelo.addAttribute("oferta", o);
			return "perfil";
		} else {

			return "redirect:/";
		}

	}
}
