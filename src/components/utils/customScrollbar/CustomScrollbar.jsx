export const CustomScrollbar = () => (
    <style>
      {`
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
  
      .custom-scrollbar::-webkit-scrollbar-track {
        background: white;
        border-radius: 10px;
      }
  
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 10px;
      }
  
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: white;
      }
      `}
    </style>
  );