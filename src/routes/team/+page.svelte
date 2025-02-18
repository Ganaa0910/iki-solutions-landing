<div class="mt-[60px] flex flex-col gap-10">
  <div class="flex flex-col items-center justify-between md:flex-row">
      <div class="flex flex-col gap-6 md:w-[528px]">
          <p class="self-stretch text-display-4 text-gray-50 md:text-display-2">
              Meet the Visionaries Behind Numad
          </p>
          <p class="mb-16 self-stretch text-body-2-regular text-gray-100 md:text-body-1-regular">
              Our innovators are shaping the future of Web3 with bold ideas and expertise.
          </p>
      </div>
      <div class="flex w-[640px] justify-center overflow-hidden rounded-[12px]">
          <img
              src="/Family.png"
              alt="Family"
              class="h-auto w-[335px] rounded-3xl md:h-[400px] md:w-[640px]"
          />
      </div>
  </div>

  <div class="mx-auto flex flex-col justify-center gap-y-8">
      <div class="flex flex-col items-start gap-6 md:flex-row md:gap-8">
          {#each companyStats as stat}
          <div
              class="group relative h-[212px] flex-col items-start justify-end gap-3 self-stretch overflow-hidden rounded-3xl border border-opacity-white4 p-6 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover md:w-[416px]"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="212"
                  viewBox="0 0 200 212"
                  class="absolute bottom-0 right-0"
                  fill="none"
              >
                  <path
                      d={stat.svgPath}
                      stroke="rgba(255, 255, 255, 0.04)"
                      class="stroke-opacity-white4 transition-all duration-300 group-hover:stroke-opacity-300"
                  />
              </svg>
              <div class="absolute bottom-6 flex flex-col gap-3">
                  <p class="text-h1 text-gray-50 duration-300 group-hover:text-gray-600">{stat.value}</p>
                  <p class="text-body-2-medium text-gray-200">{stat.label}</p>
              </div>
          </div>
          {/each}
      </div>

      <div class="flex justify-center">
          <p class="mb-16 mt-[200px] text-h1 text-gray-50 md:text-h4">Team Members</p>
      </div>

      <div class="grid grid-cols-2 gap-x-[23px] gap-y-8 md:grid-cols-4 md:gap-x-12 md:gap-y-16">
          {#each teamMembers as member}
          <div class="flex w-[156px] flex-col items-start gap-4 md:w-[292px]">
              <div class="relative">
                  <img src={member.image} alt={member.name} />
                  <div
                      class="absolute bottom-0 h-[108px] w-full bg-gradient-to-t from-gray-500 to-transparent"
                  ></div>
              </div>
              <div class="flex flex-col items-center gap-1 self-stretch px-1">
                  <p class="text-body-2-bold text-gray-50 md:text-h5">{member.name}</p>
                  <p class="text-center text-caption-2-regular text-gray-100 md:text-body-2-regular">
                      {member.role}
                  </p>
              </div>
          </div>
          {/each}
      </div>
  </div>
</div>

<script>
const companyStats = [
  {
      value: '2022', 
      label: 'Founded', 
      svgPath: "M238.935 106.899C247.347 113.356 247.012 122.058 246.65 131.315L246.648 131.367C246.365 138.742 246.067 146.517 250.212 153.815C254.005 160.524 258.237 164.736 262.65 169.1L238.935 106.899ZM238.935 106.899C228.716 99.0293 218.832 106.369 208.407 114.113L238.935 106.899Z"
  },
  {
      value: '16', 
      label: 'Employees', 
      svgPath: "M170.9 -9.17847L256.679 55.1168H256.626L257.829 56.0171C276.219 69.782 283.963 94.2588 276.932 116.594L243.697 222.074L243.697 222.075C236.668 244.433 216.499 259.5 193.732 259.5H86.2679C63.5009 259.5 43.3324 244.407 36.3029 222.075L36.3028 222.074L3.06762 116.594C-3.96279 94.2324 3.78101 69.782 22.1708 56.0171L22.1711 56.0169L109.15 -9.17787C127.614 -22.941 152.514 -22.9402 170.9 -9.17847ZM140.455 195.989L166.324 147.117L213.693 120.429L214.467 119.993L213.693 119.558L166.324 92.87L140.455 43.9974L140.013 43.1626L139.571 43.9974L113.702 92.87L66.3322 119.558L65.559 119.993L66.3322 120.429L113.702 147.117L139.571 195.989L140.013 196.824L140.455 195.989Z"
  },
  {
      value: '6', 
      label: 'Projects', 
      svgPath: "M279.474 222.044H279.5C279.5 193.317 279.498 85.76 279.216 26.5422V26.5399C279.216 19.3185 278.37 12.3459 277.263 5.09447L277.262 5.08598C276.706 0.971735 275.06 -3.15835 272.847 -6.74002L272.841 -6.75063C267.089 -16.6025 249.788 -24.2841 234.937 -13.0398L234.93 -13.035C226.679 -6.99327 223.362 1.81309 221.127 11.8466L221.126 11.8513C219.282 19.7652 217.494 27.5476 215.787 34.9802C213.211 46.1938 210.817 56.6112 208.692 65.4827C206.924 72.8595 205.339 79.1756 203.986 83.999C203.31 86.4104 202.69 88.454 202.132 90.073C201.581 91.6736 201.081 92.8913 200.635 93.639C192.949 108.138 176.089 112.423 163.504 103.01L163.5 103.007C158.654 99.2975 155.515 93.8712 153.537 88.2303L153.535 88.2231C151.003 80.6367 149.04 72.7955 147.083 64.9763L147.08 64.9664L147.08 64.9642C145.354 57.9357 143.75 50.9019 142.154 43.8999L141.897 42.7724C140.215 35.3967 138.534 28.0584 136.718 20.7918L136.718 20.791C134.499 11.8499 132.272 2.96453 127.548 -5.07051C122.573 -13.0533 116.001 -17.4421 107.191 -18.8113C106.954 -18.833 106.72 -18.8546 106.487 -18.8761C103.67 -19.1358 101.085 -19.3741 98.2822 -19.3741C97.0923 -19.3741 94.2781 -19.3868 90.4343 -19.4041C76.0971 -19.4685 47.4351 -19.5974 35.3015 -19.3743C28.3583 -19.0932 21.448 -17.436 15.0772 -14.1274L15.0731 -14.1253L15.0731 -14.1253C-0.0521502 -6.44607 -4.1841 13.058 6.57659 26.5107L6.58138 26.5167L6.58134 26.5167C11.2689 32.5648 17.609 36.1441 24.7972 38.0789C26.7063 38.5927 30.8082 39.6684 36.4492 41.1476C52.2497 45.291 80.1254 52.6009 105.709 59.6003C122.223 64.1068 130.105 74.0237 131.288 84.058C132.468 94.066 126.957 104.058 116.971 108.625L116.97 108.625C113.066 110.402 109.468 111.197 105.738 110.946C102.014 110.696 98.1999 109.406 93.8575 107.079C85.7558 102.736 75.6954 94.7105 60.8065 82.8326C59.7804 82.0139 58.7313 81.177 57.6583 80.3217C45.4343 70.6162 32.4182 68.1544 23.3685 70.3504C7.69006 74.1892 0.5 87.8939 0.5 104.257V227.847C0.5 238.33 5.45703 248.515 13.9925 254.283L13.9962 254.285C18.4146 257.329 23.6531 259.243 28.8429 259.243H92.9467C103.886 259.243 112.148 258.602 118.625 254.494C125.081 250.398 129.862 242.787 133.626 228.572C135.726 220.327 137.683 212.081 139.642 203.83L139.643 203.826C141.602 195.578 143.561 187.326 145.662 179.073C145.663 179.072 145.663 179.071 145.663 179.07L146.147 179.194C148.39 169.978 150.916 160.762 153.983 151.804L279.474 222.044ZM279.474 222.044V222.544C279.474 226.463 279.473 230.34 278.912 234.211L278.911 234.22L278.91 234.229C278.226 240.554 275.265 246.885 270.922 251.631C266.579 256.377 260.892 259.5 254.766 259.5H185.893C172.258 259.5 164.107 252.232 160.674 242.949C157.226 233.627 158.536 222.263 163.91 214.147M279.474 222.044L163.91 214.147M163.91 214.147C165.298 212.075 170.103 206.088 176.303 198.601C182.494 191.125 190.05 182.182 196.917 174.217L196.924 174.209C202.338 167.663 204.413 159.259 202.84 151.762C201.264 144.248 196.026 137.674 186.894 134.826L163.91 214.147Z"
  }
];

const teamMembers = [
  {name: 'Sainbileg', role: 'CEO', image: '1.png'},
  {name: 'Bilguun', role: 'CFO', image: '2.png'},
  {name: 'Micheal', role: 'Head of Marketing', image: '3.png'},
  {name: 'Munkh-Od', role: 'CTO', image: '4.png'},
  {name: 'Bat-Ireedui', role: 'Asset Management', image: '5.png'},
  {name: 'Dolgoon', role: 'Development Manager', image: '6.png'},
  {name: 'Gombo-Ochir', role: 'Senior Back-End Developer', image: '7.png'},
  {name: 'Gan-Erdene', role: 'Senior Front-End Developer', image: '8.png'},
  {name: 'Batzorig', role: 'Junior Front-End Developer', image: '10.png'},
  {name: 'Dalai-Erdene', role: 'Junior Front-End Developer', image: '11.png'},
  {name: 'Bat-Otgon', role: 'Junior Front-End Developer', image: '12.png'},
  {name: 'Namkhaidorj', role: 'Junior Front-End Developer', image: '13.png'},
  {name: 'Munkhbayar', role: 'UI/UX Designer', image: '14.png'},
  {name: 'Temuujin', role: 'UI Designer', image: '15.png'},
  {name: 'Erkhemchuluun', role: 'Graphic Designer', image: '16.png'}
];
</script>
