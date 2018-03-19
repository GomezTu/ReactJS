//React+Redux Stuff
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'reactstrap';
//Actions
import * as countriesActions from '../../store/actions/countries-action-creators';
import * as filterActions from '../../store/actions/filter-action-creators';
//Components (Filter + Countries List + Country Detail)
import CountryList from '../components/countries-list/countries-list'
import CountryDetail from '../components/country-detail/country-detail'
//CSS
//import './countries-container.css';


export class CountriesContainer extends React.Component{

    componentDidMount(){
        if ((this.props.countries && this.props.countries.length === 0) || !this.props.countries){
            this.props.actions.GetCountries();
        }
    }

    render(){
        return(
            <Col xs="12">
                <Row>
                    Filter Row HTML
                </Row>
                <Row>
                    <CountryList 
                        countries={this.props.countries}
                        onCountryClick={this.props.actions.SelectCountry}
                    />
                </Row>
                <Row>
                    <CountryDetail
                        country={this.props.selectedCountry}
                    />
                </Row>
            </Col>
        );
    }
}

export function mapStateToProps({ greetings }) {
    return {
        countries: greetings.countries,
        selectedCountry: greetings.selectedCountry,
        filter: greetings.filter
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...countriesActions,
            ...filterActions
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesContainer);

