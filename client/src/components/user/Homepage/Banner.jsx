function Banner({src}) {
  return ( 
    <div className="flex items-center justify-center">
          <img
            src={src}
            alt="Banner Image"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
   );
}

export default Banner;