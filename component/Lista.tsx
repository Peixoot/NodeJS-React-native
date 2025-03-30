import { List } from 'react-native-paper';
import React from 'react';

const estados = [
  'Acre', 'Alagoas', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 
  'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
  'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 
  'Sergipe', 'Tocantins'
];

const Lista = (props) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

    const handleItemPress = (estado: string) => {
        setSelectedValue(estado);
        setExpanded(false);
        props.onStateSelect(estado);  
    };

    return (
        <List.Section 
            title={selectedValue == null ? "Selecione o estado" : selectedValue}
            style={{ backgroundColor: '#450057', marginHorizontal: 20 }}
        >
            <List.Accordion
                title="Selecione o estado"
                left={props => <List.Icon {...props} icon="map-marker" />}
                expanded={!expanded}
                onPress={handlePress}
                style={{ backgroundColor: '#333' }}
            >
                {estados.map((estado, index) => (
                    <List.Item 
                        key={index} 
                        title={estado} 
                        onPress={() => handleItemPress(estado)} 
                        left={props => <List.Icon {...props} icon="map" />} 
                        titleStyle={{ color: '#bbb' }}  
                    />
                ))}
            </List.Accordion>
        </List.Section>
    );
};

export default Lista;
