import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';

function Garden() {
    return (
        <div className="garden">
            <div className='grid'>
                
            </div>
            <div className='painting-container'>
                <img 
                    alt='The Garden of Earthly Delights by Hieronymus Bosch'
                    className='painting-itself'
                    src={ThePainting} 
                />
            </div>
        </div>
    );
}

export default Garden;