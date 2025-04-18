

class Usuario:

    def __init__(self, id, nombre):
        self.id = id
        self.nombre = nombre


class Estudiante(Usuario):

    def __init__(self, id, nombre):
        super(id, nombre)
        self.calificaciones = []

    def rendirExamen(self):
        print('rindiendo examen')

    def asistirAClases(self, idClase):
        print(f'Asistiendo a la clase {idClase}')


class Profesor(Usuario):


    def __init__(self, id, nombre, asignatura):
        super(id, nombre)
        self.asignatura = asignatura
        self.alumnos = []

    def calificarAlumno(self, alumnoId, nota):
        print(f'calificando al alumno {alumnoId} con la nota {nota}')

    def pasarLista(self):
        print('pasando lista')

    def agregarAlumno(self, alumno):
        self.alumno.push(alumno)


class PersonalAdministrativo(Usuario):

    def __init__(self, id, nombre, seccion):
        super(id, nombre)
        self.__seccion  

    def mostrarSeccion(self):
        print(f'la persona {self.nombre} es responsable de la seccion {self.__seccion}')


class Estudiante:

    def __init__(self, nombre, grado, numeroDeMatricula):
        self.__nombre = nombre
        self.__grado = grado
        self.__numeroDeMatricula = numeroDeMatricula

    def presentarse(self):
        print(f"Hola soy {self.__nombre} y estoy en el {self.__grado} básico.")

    def mostrarNombreYNumeroDeMatricula(self):
        print(f'Estudiante {self.__nombre} el numero de matricula asignado es el {self.__numeroDeMatricula}')
    



class Pajaro:
    def __init__(self, color):
        self.color = color

    def volar(self):
        print("El pajaro esta volando.")

    def cantar(self):
        print(f'el pajaro de color {self.color} esta cantando')

#Prueba

mi_pajaro = Pajaro("Verde")
mi_pajaro.volar()
print("Y es de color", mi_pajaro.color)