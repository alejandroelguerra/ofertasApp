package des.alumno.ofertasapp.entidades;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "oferta")
public class Oferta implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id;
	@Column
	private String nombre;
	@Column
	private float precio;
	@Column
	private LocalDate fecha;
	@Column
	private String prioridad;
	@Column
	private String hiperenlace;
	@Column
	private String descripcion;
	
	
	public Oferta(int id, String nombre, float precio, LocalDate fecha, String prioridad, String hiperenlace,
			String descripcion) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.fecha = fecha;
		this.prioridad = prioridad;
		this.hiperenlace = hiperenlace;
		this.descripcion = descripcion;
	}


	public Oferta(String nombre, float precio, LocalDate fecha, String prioridad, String hiperenlace,
			String descripcion) {
		this.nombre = nombre;
		this.precio = precio;
		this.fecha = fecha;
		this.prioridad = prioridad;
		this.hiperenlace = hiperenlace;
		this.descripcion = descripcion;
	}


	public Oferta(String nombre, float precio, String prioridad, String hiperenlace, String descripcion) {
		this.nombre = nombre;
		this.precio = precio;
		this.prioridad = prioridad;
		this.hiperenlace = hiperenlace;
		this.descripcion = descripcion;
	}

	public Oferta() {
	}
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public float getPrecio() {
		return precio;
	}


	public void setPrecio(float precio) {
		this.precio = precio;
	}


	public LocalDate getFecha() {
		return fecha;
	}


	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}


	public String getPrioridad() {
		return prioridad;
	}


	public void setPrioridad(String prioridad) {
		this.prioridad = prioridad;
	}


	public String gethiperenlace() {
		return hiperenlace;
	}


	public void sethiperenlace(String hiperenlace) {
		this.hiperenlace = hiperenlace;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	
	
	
}
