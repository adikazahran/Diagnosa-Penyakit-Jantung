import { useState } from 'react';
import axiosInstance from '../api/axios';

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/load-data?target_column=target');
      setData(response.data);
    } catch (err) {
      console.log(err)
      setError(err.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  const labelCounts = async () => {
    try {
      const response = await axiosInstance.get('/label-counts?target_column=target');
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  const trainModel = async () => {
    try {
      const response = await axiosInstance.post('/train-model', {
        test_size: 0.2
      })
      return response.data
    } catch (e) {
      console.log(e);
    }
  }

  const login = async (data) => {
    try {
      const response = await axiosInstance.post('/login', data);
      return response.data; // Response berhasil
    } catch (e) {
      console.error(e);
      return { error: e.response?.data?.message || 'Username atau Password salah.' }; // Error handling
    }
  };

  const register = async (data) => {
    try {
      const response = await axiosInstance.post('/register', 
        data
      )
      return response.data
    } catch (e) {
      console.log(e);
    }
  }
  return {
    loading,
    data,
    error,
    loadData,
    labelCounts,
    trainModel,
    login,
    register
  };
};
