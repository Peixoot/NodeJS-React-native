import { useState } from 'react';
import { TextInput, Button, Modal, Portal, Provider, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Lista from './Lista';

const ViaCep = () => {
    const [cep, setCep] = useState("");
    const [dados, setDados] = useState<any>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState(""); // novo campo telefone
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCadastroConcluido, setCadastroConcluido] = useState(false);
    const [cepErro, setCepErro] = useState(false); 

    const BuscaCep = (cep: string) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    setShowModal(true);
                    setDados(null);
                    setCepErro(true); 
                    setRua("");
                    setBairro("");
                    setEstado("");
                    setCidade("");
                } else {
                    setDados(dados);
                    setShowModal(false);
                    setCepErro(false);  
                    setRua(dados.logradouro || "");
                    setBairro(dados.bairro || "");
                    setEstado(dados.uf || "");
                    setCidade(dados.localidade || "");
                }
            })
            .catch((x) => {
                console.log(x);
            });
    };

    const handleConcluido = () => {
        if (nome && email && telefone) { 
            setCadastroConcluido(true);
            setCep("");
            setDados(null);
            setNome("");
            setEmail("");
            setTelefone("");
            setRua("");
            setBairro("");
            setEstado("");
            setCidade("");
            setEstadoSelecionado(null);
            setCepErro(false);
        }
    };

    const handleStateSelect = (estado: string) => {
        setEstadoSelecionado(estado);
        setEstado(estado);
    };

    const enderecoEditable = cepErro;

    return (
        <Provider>
            <ScrollView style={styles.scrollContainer}>
                <Portal>
                    <Modal 
                        visible={showModal} 
                        onDismiss={() => setShowModal(false)} 
                        contentContainerStyle={styles.modal}
                    >
                        <Paragraph>
                            CEP não encontrado. Você pode preencher os dados manualmente.
                        </Paragraph>
                    </Modal>
                </Portal>

                <TextInput
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                    mode="outlined"
                    left={<TextInput.Icon name="account" />}
                    style={styles.input}
                />

                <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    left={<TextInput.Icon name="email" />}
                    style={styles.input}
                />

                {/* Novo campo Telefone com limitação para 11 caracteres numéricos */}
                <TextInput
                    label="Telefone"
                    value={telefone}
                    onChangeText={text => setTelefone(text.replace(/\D/g, '').slice(0, 11))}
                    mode="outlined"
                    keyboardType="phone-pad"
                    maxLength={11}
                    left={<TextInput.Icon name="phone" />}
                    style={styles.input}
                />

                <TextInput
                    label="CEP"
                    value={cep}
                    onChangeText={text => setCep(text.replace(/\D/g, '').slice(0, 8))}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={8}
                    onBlur={() => BuscaCep(cep)}
                    editable={dados === null}
                    left={<TextInput.Icon name="map-marker" />}
                    style={styles.input}
                />

                <TextInput
                    label="Rua"
                    value={rua}
                    onChangeText={setRua}
                    mode="outlined"
                    editable={enderecoEditable}
                    left={<TextInput.Icon name="home" />}
                    style={styles.input}
                />

                <TextInput
                    label="Bairro"
                    value={bairro}
                    onChangeText={setBairro}
                    mode="outlined"
                    editable={enderecoEditable}
                    left={<TextInput.Icon name="google-maps" />}
                    style={styles.input}
                />

                <TextInput
                    label="Estado"
                    value={estadoSelecionado || estado}
                    onChangeText={setEstado}
                    mode="outlined"
                    editable={enderecoEditable}
                    left={<TextInput.Icon name="map" />}
                    style={styles.input}
                />

                <TextInput
                    label="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
                    mode="outlined"
                    editable={enderecoEditable}
                    left={<TextInput.Icon name="city" />}
                    style={styles.input}
                />

                <Lista dados={dados} onStateSelect={handleStateSelect} />

                <Button 
                    mode="contained" 
                    onPress={handleConcluido} 
                    style={styles.button} 
                    labelStyle={styles.buttonText}
                >
                    Concluído
                </Button>

                {isCadastroConcluido && (
                    <Paragraph style={styles.successMessage}>
                        Cadastro realizado
                    </Paragraph>
                )}
            </ScrollView>
        </Provider>
    );
};

const styles = {
    scrollContainer: {
        flex: 1,
    },
    modal: {
        backgroundColor: '#333',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#6200EE',
    },
    buttonText: {
        color: '#fff',
    },
    successMessage: {
        marginTop: 20,
        color: 'white',
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
        marginHorizontal: 40,
        backgroundColor: '#450057',
        color: '#fff',
    },
};

export default ViaCep;
