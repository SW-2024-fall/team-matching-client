import Splash from '@components/Splash';
import { connect } from 'react-redux';

function mapReduxStateToReactProps(state) {
    return state;
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        goMain: function (dataToSubmit) {
            dispatch(autoLogin(dataToSubmit));
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Splash);