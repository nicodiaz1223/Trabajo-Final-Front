"use client";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';

function RegistrarPagina() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tipoUsuario, setTipoUsuario] = useState('');
  const router = useRouter();
  const onSubmit = handleSubmit(async data => {
    if (data.Contraseña !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    // Realiza la lógica de envío de datos al servidor aquí
    const res = await fetch("/auth/Registrar", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  const tiposUsuario = [
    { value: 'Masajista', label: 'Masajista' },
    { value: 'Director de escuadra', label: 'Director de escuadra' },
    { value: 'Ciclista', label: 'Ciclista' },
  ];

  const escuadras = {
    Colombia: 'Team Colombia',
    España: 'Movistar Team',
    Francia: 'Team Sky',
    Italia: 'Team Ineos',
    Alemania: 'Bora-Hansgrohe',
  };

  const tiposContextura = [
    { value: 'Ligera', label: 'Ligera' },
    { value: 'Media', label: 'Media' },
    { value: 'Pesado', label: 'Pesado' },
  ];

  const especialidades = [
    { value: 'Escaladores', label: 'Escaladores' },
    { value: 'Rodadores', label: 'Rodadores' },
    { value: 'Sprinters o embaladores', label: 'Sprinters o embaladores' },
    { value: 'gregarios', label: 'gregarios' },
    { value: 'clasicómanos', label: 'clasicómanos' },
    { value: 'contrarrelojista', label: 'contrarrelojista' },
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
      <form onSubmit={onSubmit} className="w-1/4">
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
        <input type="text" {...register('Nombre', { required: true })} placeholder="Nombre" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Nombre && <span className="text-black text-xs">Nombre es requerido</span>}

        <label htmlFor="Apellido" className="text-blue-600 font-bold mb-2 block text-sm text-left">Apellido</label>
        <input type="text" {...register('Apellido', { required: true })} placeholder="Apellido" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Apellido && <span className="text-black text-xs">Apellido es requerido</span>}

        <label htmlFor="Correo" className="text-blue-600 font-bold mb-2 block text-sm text-left">Correo</label>
        <input type="email" {...register('Correo', { required: true })} placeholder="Correo@gmail.com" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Correo && <span className="text-black text-xs">Correo es requerido</span>}

        <label htmlFor="Contraseña" className="text-blue-600 font-bold mb-2 block text-sm text-left">Contraseña</label>
        <input type="password" {...register('Contraseña', { required: true })} placeholder="Contraseña" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Contraseña && <span className="text-black text-xs">Contraseña es requerida</span>}

        <label htmlFor="confirmPassword" className="text-blue-600 font-bold mb-2 block text-sm text-left">Confirmar Contraseña</label>
        <input type="password" {...register('confirmPassword', { required: true })} placeholder="Confirmar Contraseña" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.confirmPassword && <span className="text-black text-xs">Confirmar Contraseña es requerido</span>}

        <label htmlFor="TipoDocumento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Tipo de Documento</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('TipoDocumento', { required: true })}>
          <option value="">Selecciona el tipo de documento</option>
          {tiposDocumento.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        {errors.TipoDocumento && <span className="text-black text-xs">Tipo de Documento es requerido</span>}

        <label htmlFor="Documento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Número de Documento</label>
        <input type="text" {...register('Documento', { required: true })} placeholder="Documento" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Documento && <span className="text-black text-xs">Número de Documento es requerido</span>}

        <label htmlFor="FechaNacimiento" className="text-blue-600 font-bold mb-2 block text-sm text-left">Fecha de Nacimiento</label>
        <input type="date" {...register('FechaNacimiento', { required: true })} className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.FechaNacimiento && <span className="text-black text-xs">Fecha de Nacimiento es requerida</span>}

        <label htmlFor="Genero" className="text-blue-600 font-bold mb-2 block text-sm text-left">Género</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('Genero', { required: true })}>
          <option value="">Selecciona tu género</option>
          {generos.map((genero) => (
            <option key={genero.value} value={genero.value}>{genero.label}</option>
          ))}
        </select>
        {errors.Genero && <span className="text-black text-xs">Género es requerido</span>}

        <label htmlFor="Nacionalidad" className="text-blue-600 font-bold mb-2 block text-sm text-left">Nacionalidad</label>
        <input type="text" {...register('Nacionalidad', { required: true })} placeholder="Nacionalidad" className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.Nacionalidad && <span className="text-black text-xs">Su Nacionalidad es requerida</span>}

        <label htmlFor="TipoUsuario" className="text-blue-600 font-bold mb-2 block text-sm text-left">Tipo de Usuario</label>
        <select className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" {...register('TipoUsuario', { required: true })} onChange={(e) => setTipoUsuario(e.target.value)}>
          <option value="">Selecciona el tipo de usuario</option>
          {tiposUsuario.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        {errors.TipoUsuario && <span className="text-black text-xs">Tipo de Usuario es requerido</span>}

        <label htmlFor="FechaInicioCarrera" className="text-blue-600 font-bold mb-2 block text-sm text-left">Fecha de Inicio de su Profesión</label>
        <input type="date" {...register('FechaNacimiento', { required: true })} className="p-3 rounded block mb-2 w-full bg-white text-black font-bold" />
        {errors.FechaInicioCarrera && <span className="text-black text-xs">Fecha de Inicio de su Profesión es requerida</span>}
        
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
