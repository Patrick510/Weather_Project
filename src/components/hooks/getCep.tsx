import axios from "axios";

interface CardGetCepProps {
  cep: string;
}

export async function getCep({ cep }: CardGetCepProps) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
