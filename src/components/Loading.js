import styled from 'styled-components';

export default function Loading({ spinnerSize, margin }) {
    return (
        <LoadingContainer margin = {margin}>
            <img    src = "../assets/Girassol.png"
                    alt = ""
                    width= {spinnerSize}
                    className="spinner"/>
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.margin}px;
    z-index: 130;

    .spinner {
        animation: rotate 5s linear infinite;
        width:  ${props => props.width}px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`