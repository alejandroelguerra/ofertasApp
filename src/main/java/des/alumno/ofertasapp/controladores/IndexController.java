	package des.alumno.ofertasapp.controladores;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.servicios.OfertaServicio;

@Controller
public class IndexController {

	@Autowired
	private OfertaServicio ofertaservicio;
	@GetMapping("/")
	public String getIndex (Model modelo) {
		
		List<Oferta> o=ofertaservicio.listarTodas();
		modelo.addAttribute("oferta",o);
		return "index";
	}
	
	@GetMapping("/perfil")
	public String getPerfil () {
		return "perfil";
	}
	
	@PostMapping(value = "/sesion")
	public String postLogin(Model modelo,HttpSession session,@RequestParam String usuario) {
		
		Boolean logueado = (Boolean) session.getAttribute("logueado");
		logueado=true;
		session.setAttribute("logueado",logueado);
		String nombre= (String) session.getAttribute("usuario");
		nombre=usuario;
		session.setAttribute("usuario", nombre);
		modelo.addAttribute("logueado",logueado);
		return"redirect:/";

	}
	
	@PostMapping("/destroy")
	public String destroySession(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "todos")
	public List<Oferta> obtenerTodos() {
	return ofertaservicio.listarTodas();
	}
	//asdas
}
