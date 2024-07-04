export const getUsuario = async (user_id: string) => {
  try {
    console.log('response')
    const response = await fetch(`${process.env.API_URL}/user/${user_id}`);
    if (response.ok) {

      return await response.json();
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.error('Erro ao processar usuário', error);
    return { success: false, message: 'Erro na comunicação com o servidor' };
  }
};
