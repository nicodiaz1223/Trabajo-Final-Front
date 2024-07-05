"use client";
import { useForm,SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { registerS, RegisterRequest } from '../../services/registerService';

const RegistrarPagina = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
  const [tipoUsuario, setTipoUsuario] = useState('');
  const router = useRouter();
  const onSubmit: SubmitHandler<RegisterRequest> = async(data) => {
    const registerRequest: RegisterRequest = {
      nombreusuario: data.nombreusuario,
      apellidousuario: data.apellidousuario,
      correousuario: data.correousuario,
      contrasenausuario: data.contrasenausuario,
      confirmPassword: data.confirmPassword,
      documentousuario: data.documentousuario,
      iddocumento: Number(data.iddocumento),
      fechanacimiento: new Date(data.fechanacimiento),
      generousuario: data.generousuario,
      nacionalidad: data.nacionalidad,
      tipousuario: tipoUsuario, // Asumiendo que este valor se maneja con un estado aparte
      fechainiciocarrera: new Date(data.fechainiciocarrera),
    };
    if (data.contrasenausuario !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }    
    try {
      const response: string = await registerS(registerRequest);
      // Manejar la respuesta del servicio de login
      console.log('Respuesta de inicio de sesión:', response);
    } catch (error: any) {
      if (typeof error === 'string') {
        console.error('Error al iniciar sesión:', error);
      } else {
        console.error('Error al iniciar sesión:', error.message);}
      }
    console.log(registerRequest);
  };

  const tiposUsuario = [
    { value: 'Masajista', label: 'Masajista' },
    { value: 'Director de escuadra', label: 'Director de escuadra' },
    { value: 'Ciclista', label: 'Ciclista' },
  ];  
  const tiposDocumento = [
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  const generos = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
  ];

  return (
    <div className="flex justify-center items-center bg-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <div className="text-blue-600 font-bold text-center mb-2">
          <div className="font-bold">
            <span className="text-blue-600">IS</span>
            <span className="text-black">UC</span>
            <span className="text-red-600">I</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Registrar</h1>
          <div className="border-2 w-10 border-blue-600 mx-auto mb-2"></div>
        </div>
        
        <label htmlFor="Nombre" className="text-blue-600 font-bold mb-2 block text-sm text-left">Nombre</label>
        <input type="text" {...register('nombreusuario', { required: true })} placeholder="Nombre" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.nombreusuario && <span className="text-black text-xs">Nombre es requerido</span>}

        <label htmlFor="Apellido" className="text-blue-600 font-bold mb-2 block text-sm text-left">Apellido</label>
        <input type="text" {...register('apellidousuario', { required: true })} placeholder="Apellido" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.apellidousuario && <span className="text-black text-xs">Apellido es requerido</span>}

        <label htmlFor="Correo" className="text-blue-600 font-bold mb-2 block text-sm text-left">Correo</label>
        <input type="email" {...register('correousuario', { required: true })} placeholder="Correo@gmail.com" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.correousuario && <span className="text-black text-xs">Correo es requerido</span>}

        <label htmlFor="Contraseña" className="text-blue-600 font-bold mb-2 block text-sm text-left">Contraseña</label>
        <input type="password" {...register('contrasenausuario', { required: true })} placeholder="Contraseña" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.contrasenausuario && <span className="text-black text-xs">Contraseña es requerida</span>}

        <label htmlFor="confirmPassword" className="text-blue-600 font-bold mb-2 block text-sm text-left">Confirmar Contraseña</label>
        <input type="password" {...register('confirmPassword', { required: true })} placeholder="Confirmar Contraseña" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.confirmPassword && <span className="text-black text-xs">Confirmar Contraseña es requerido</span>}

        <label htmlFor="TipoDocumento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Tipo de Documento</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('documentousuario', { required: true })}>
          <option value="">Selecciona el tipo de documento</option>
          {tiposDocumento.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        {errors.documentousuario && <span className="text-black text-xs">Tipo de Documento es requerido</span>}

        <label htmlFor="Documento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Número de Documento</label>
        <input type="text" {...register('iddocumento', { required: true })} placeholder="Documento" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.iddocumento && <span className="text-black text-xs">Número de Documento es requerido</span>}

        <label htmlFor="FechaNacimiento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Fecha de Nacimiento</label>
        <input type="date" {...register('fechanacimiento', { required: true })} className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.fechanacimiento && <span className="text-black text-xs">Fecha de Nacimiento es requerida</span>}

        <label htmlFor="Genero" className="text-blue-600 font-bold mb-2 block text-sm text-left">Género</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('generousuario', { required: true })}>
          <option value="">Selecciona tu género</option>
          {generos.map((genero) => (
            <option key={genero.value} value={genero.value}>{genero.label}</option>
          ))}
        </select>
        {errors.generousuario && <span className="text-black text-xs">Género es requerido</span>}

        <label htmlFor="Nacionalidad" className="text-blue-600 font-bold mb-2 block text-sm text-left">Nacionalidad</label>
        <input type="text" {...register('nacionalidad', { required: true })} placeholder="Nacionalidad" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.nacionalidad && <span className="text-black text-xs">Su Nacionalidad es requerida</span>}

        <label htmlFor="TipoUsuario" className="text-blue-600 font-bold mb-2 block text-sm text-left">Tipo de Usuario</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('tipousuario', { required: true })} onChange={(e) => setTipoUsuario(e.target.value)}>
          <option value="">Selecciona el tipo de usuario</option>
          {tiposUsuario.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        {errors.tipousuario && <span className="text-black text-xs">Tipo de Usuario es requerido</span>}

        <label htmlFor="FechaInicioCarrera" className="text-blue-600 font-bold mb-2 block text-sm text-left">Fecha de Inicio de su Profesión</label>
        <input type="date" {...register('fechainiciocarrera', { required: true })} className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.fechainiciocarrera && <span className="text-black text-xs">Fecha de Inicio de su Profesión es requerida</span>}
        
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-blue-600 border-2 border-white rounded-full px-12 py-2 font-semibold text-white hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out" onClick={() => router.push('/Login')}>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegistrarPagina;
