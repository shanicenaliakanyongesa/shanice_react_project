const CustomCarousel = () => {
    return (
      <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Carousel Inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/gym2.jpg" className="d-block w-100" alt="Slide 1" height='300px' />
          </div>
          <div className="carousel-item">
            <img src="/images/gym1.jpg" className="d-block w-100" alt="Slide 2" height='300px' />
          </div>
          <div className="carousel-item">
            <img src="/images/gym3.jpg" className="d-block w-100" alt="Slide 3" height='300px' />
          </div>
        </div>
  
        {/* Carousel Controls */}
        <a href="#mycarousel" className="carousel-control-prev" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a href="#mycarousel" className="carousel-control-next" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    );
  };
  
  export default CustomCarousel;
  