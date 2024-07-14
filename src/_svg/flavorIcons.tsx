import { type flavors } from "~/_util/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

function iconSwitch(flavor: (typeof flavors)[number]) {
  switch (flavor) {
    case "Top":
      return <TopFlavorIcon></TopFlavorIcon>;
    case "Bottom":
      return <BottomFlavorIcon></BottomFlavorIcon>;
    case "Up":
      return <UpFlavorIcon></UpFlavorIcon>;
    case "Down":
      return <DownFlavorIcon></DownFlavorIcon>;
    case "Strange":
      return <StrangeFlavorIcon></StrangeFlavorIcon>;
    case "Charm":
      return <CharmFlavorIcon></CharmFlavorIcon>;
    default:
      return <></>;
  }
}

export const FlavorIcon = ({
  flavor,
  tooltip,
}: {
  flavor: (typeof flavors)[number];
  tooltip?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{iconSwitch(flavor)}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip ?? `${flavor} Flavor`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const BottomFlavorIcon = () => {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor" height="1em" width="1em">
      <path
        fill="#E34234"
        d="m 6.2140782,12.978553 c -0.031208,-0.051 -0.1757453,-0.8556 -0.2390016,-1.3315 -0.036309,-0.2732 -0.068718,-0.4995 -0.072019,-0.5028 -0.003,0 -0.1137293,-0.016 -0.2453932,-0.028 l -0.2393918,-0.022 0.014304,0.1054 c 0.008,0.058 0.035609,0.2735 0.061716,0.4791 0.026107,0.2054 0.083522,0.5743 0.1275429,0.8195 0.044011,0.2452 0.075219,0.4501 0.069318,0.4551 -0.015704,0.013 -0.4572079,-0.036 -0.8423672,-0.095 l -0.3333959,-0.051 -0.1377955,-0.269 c -0.1837874,-0.3587 -0.3506004,-0.78 -0.4885059,-1.2337 l -0.1134293,-0.3732 -0.2427525,-0.041 c -0.1335145,-0.022 -0.2479039,-0.035 -0.2541956,-0.029 -0.03751,0.037 0.3322757,1.1693 0.5031397,1.54 0.068818,0.1494 0.090623,0.2257 0.064317,0.2257 -0.021806,0 -0.1248522,-0.043 -0.228899,-0.095 -0.2127148,-0.1062 -0.403374,-0.3182 -0.7070022,-0.7859 -0.263598,-0.406 -0.8131496,-1.603 -0.760246,-1.656 0.007,-0.01 0.1525993,0.029 0.3235934,0.08 0.5999747,0.1786 1.4641674,0.3245 2.506146,0.423 0.8403066,0.079 3.1946435,0.079 4.0456829,-5e-4 1.0835596,-0.1013 2.0033466,-0.259 2.5854166,-0.4432 0.127713,-0.041 0.238302,-0.067 0.245764,-0.06 0.0185,0.019 -0.09753,0.337 -0.266389,0.7313 -0.289235,0.6754 -0.780491,1.4322 -1.049961,1.6176 -0.141996,0.098 -0.384579,0.2058 -0.408385,0.182 -0.008,-0.01 0.03991,-0.1391 0.106117,-0.2919 0.176316,-0.4069 0.5039,-1.4256 0.468521,-1.4569 -0.02441,-0.022 -0.461539,0.058 -0.489006,0.089 -0.0151,0.017 -0.08022,0.1992 -0.144667,0.4048 -0.1425074,0.4544 -0.358393,0.9919 -0.5019,1.2497 -0.120001,0.2156 -0.075119,0.1973 -0.6677822,0.2727 -0.4999988,0.064 -0.6227605,0.077 -0.6227605,0.066 0,-0.01 0.026907,-0.1403 0.059715,-0.3007 0.061316,-0.2991 0.1694637,-1.0078 0.2080036,-1.3628 l 0.021706,-0.1996 -0.1959705,0.02 c -0.1077878,0.011 -0.2191365,0.021 -0.2474438,0.021 -0.042511,0 -0.058215,0.061 -0.090223,0.3487 -0.040911,0.3676 -0.1716843,1.1634 -0.2280288,1.3873 l -0.033309,0.1323 -0.7729192,0 c -0.4250996,0 -0.779631,-0.011 -0.7878331,-0.024 z M 5.8205167,9.5109534 c -1.0807986,-0.049 -2.3418536,-0.208 -3.0826746,-0.3895 -0.2931956,-0.072 -0.8693341,-0.2498 -0.8990317,-0.2777 -0.006,-0.01 -0.03851,-0.1831 -0.071418,-0.3937 -0.07762,-0.4969 -0.1117689,-1.8408 -0.060316,-2.3757 0.066017,-0.6864 0.1033166,-0.8918 0.1574806,-0.8677 0.2031824,0.091 0.8937404,0.3009 1.2002294,0.3653 1.9169241,0.4029 4.8692651,0.4622 7.0683716,0.142 0.859332,-0.1251 1.470769,-0.2799 2.010979,-0.5087 0.15506,-0.066 0.237531,2.2447 0.112159,3.1422 -0.03111,0.2227 -0.06322,0.4282 -0.07132,0.4567 -0.0177,0.062 -0.546281,0.2383 -1.055502,0.3518 -1.3807957,0.3077 -3.3847023,0.4417 -5.3089583,0.355 z m -0.072619,-0.6886 c -0.010403,-0.107 -0.028507,-0.701 -0.04021,-1.3198 l -0.021205,-1.1252 -0.139726,-0.019 c -0.07682,-0.011 -0.1819269,-0.019 -0.2334902,-0.019 l -0.093724,0 0.016904,1.3052 c 0.009,0.7179 0.026207,1.3204 0.03771,1.339 0.012003,0.019 0.1211912,0.034 0.2568162,0.034 l 0.2360008,0 -0.018905,-0.1946 z m 2.9796281,-0.031 c 0.031108,-0.3794 0.060616,-2.2202 0.03761,-2.3429 l -0.021606,-0.1152 -0.2237877,0.022 c -0.1230817,0.012 -0.2254081,0.024 -0.2273886,0.026 -0.002,0 -0.011403,0.5962 -0.020905,1.3198 l -0.017304,1.3156 0.2273987,0 0.2273886,0 0.018505,-0.2257 z m -5.3460981,-0.1868 c -0.050113,-0.4345 -0.088623,-1.4959 -0.071418,-1.9706 l 0.019105,-0.5304 -0.2201467,-0.041 c -0.1210812,-0.022 -0.2295992,-0.031 -0.2411622,-0.02 -0.03821,0.038 -0.042011,1.4851 -0.005,2.0553 0.019805,0.3082 0.03951,0.5639 0.043811,0.5682 0.010303,0.01 0.395612,0.094 0.4508562,0.098 0.034009,0 0.03921,-0.032 0.024406,-0.1603 z m 7.5806943,0.1 c 0.09882,-0.026 0.11509,-0.044 0.131184,-0.1466 0.04541,-0.2879 0.08742,-1.5588 0.06702,-2.0271 l -0.02211,-0.5091 -0.09773,0.02 c -0.05371,0.011 -0.15729,0.028 -0.230079,0.039 l -0.132334,0.019 -3.1e-4,0.782 c -2.8e-4,0.7229 -0.03651,1.5382 -0.07952,1.7906 l -0.018,0.1055 0.134564,-0.021 c 0.07402,-0.012 0.185318,-0.035 0.247364,-0.051 z m -5.0949235,-3.9429 c -1.4725096,-0.073 -2.649433,-0.2414 -3.5886751,-0.5142 -0.124162,-0.036 -0.2257582,-0.076 -0.2257582,-0.089 0,-0.059 0.2630378,-0.7764 0.3890903,-1.0607 0.1425268,-0.3214 0.4607388,-0.8821 0.585901,-1.0322 l 0.068118,-0.082 0.2065032,0.1253 0.2064933,0.1253 -0.059115,0.1919 c -0.1079578,0.3504 -0.3694552,1.4343 -0.3694552,1.5314 0,0.025 0.4449547,0.08 0.4649198,0.057 0.012703,-0.015 0.060616,-0.2118 0.1063775,-0.4379 0.068818,-0.3402 0.2826328,-1.1537 0.31046,-1.1815 0.004,0 0.1754052,0.026 0.380358,0.067 0.2049529,0.041 0.5317871,0.096 0.7262872,0.1211 0.1945102,0.025 0.3578723,0.05 0.3630236,0.056 0.005,0.01 -0.017004,0.2899 -0.049313,0.6324 -0.032308,0.3426 -0.059015,0.7014 -0.059415,0.7974 l -7.202e-4,0.1745 0.2225174,0.021 c 0.1223815,0.011 0.2259782,0.017 0.2301993,0.012 0.004,0 0.023306,-0.2046 0.042311,-0.4444 0.019105,-0.2397 0.050213,-0.597 0.069218,-0.794 l 0.034609,-0.3581 1.070686,0 1.0706859,0 0.015504,0.093 c 0.024706,0.1484 0.1088881,1.1463 0.1094082,1.2963 7.402e-4,0.2097 0.018205,0.222 0.2785118,0.1963 l 0.2257282,-0.022 -0.018505,-0.2213 c -0.010203,-0.1217 -0.041311,-0.4778 -0.069118,-0.7913 -0.027807,-0.3134 -0.042211,-0.5782 -0.032008,-0.5885 0.010203,-0.01 0.1694837,-0.037 0.3539112,-0.061 0.1844276,-0.023 0.4824544,-0.072 0.6622707,-0.1084 0.1798264,-0.037 0.3533511,-0.068 0.3856194,-0.07 0.048713,0 0.07652,0.057 0.1641232,0.3543 0.05801,0.1969 0.149968,0.5648 0.204362,0.8174 0.111469,0.5177 0.08722,0.4919 0.399533,0.425 l 0.160272,-0.034 -0.01971,-0.1313 c -0.03441,-0.2296 -0.168703,-0.7987 -0.286733,-1.2152 -0.06992,-0.2466 -0.101697,-0.4073 -0.08192,-0.4139 0.01781,-0.01 0.112579,-0.059 0.210645,-0.1181 0.09813,-0.059 0.190259,-0.1 0.204873,-0.091 0.09532,0.059 0.574818,0.9407 0.748642,1.3766 0.106328,0.2667 0.282693,0.7915 0.26956,0.8021 -0.02661,0.022 -0.371286,0.1196 -0.705402,0.2006 -0.733789,0.1779 -1.7691563,0.3102 -2.9305657,0.3744 -0.515953,0.028 -1.9571145,0.035 -2.44435,0.011 z m 0.2613976,-2.5624 c -0.8859783,-0.053 -1.7073601,-0.18 -2.2188819,-0.3439 -0.2849735,-0.091 -0.4955077,-0.2026 -0.5001089,-0.2644 -0.004,-0.054 0.3908907,-0.2296 0.69829,-0.3103 0.8059477,-0.2115 1.5360359,-0.28150002 2.9269845,-0.28070002 1.2219449,7.0002e-4 1.6315205,0.032 2.4268055,0.18730002 0.6142987,0.1197 1.1229497,0.3104 1.1229497,0.4211 0,0.051 -0.369886,0.2163 -0.662331,0.295 -0.3969923,0.1069 -0.9177865,0.1945 -1.4722495,0.2477 -0.5913624,0.057 -1.7678957,0.081 -2.3214584,0.048 z m 2.9812185,-0.4708 c 0.2449632,-0.034 0.4161173,-0.098 0.4161173,-0.1546 0,-0.1361 -1.0536116,-0.1807 -1.4188358,-0.06 -0.1450774,0.048 -0.1904691,0.1103 -0.1110886,0.1528 0.1634421,0.087 0.7112233,0.1179 1.1138071,0.062 z"
      />
    </svg>
  );
};

const CharmFlavorIcon = () => {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
      <path
        fill="#324D12"
        d="M506.705,405.481c-5.599-2.719-21.469,17.541-24.916,20.58c-10.414,9.197-23.086,17.63-37.393,18.465 c-33.091,1.928-45.372-33.918-54.578-58.745c-21.611-57.857-68.085-116.461-137.378-83.111 c-29.2,14.058-47.718,41.782-64.05,68.609c-10.362,16.99-26.374,54.605-49.94,56.186c-29.928,2.008-47.914-27.272-45.088-54.365 c3.199-30.701,27.333-52.828,49.086-72.164c45.675-40.591,93.161-73.026,107.592-135.716 c14.751-64.139-16.012-132.446-80.702-153.195c-23.94-7.669-63.837-28.942-102.421,14.315c-65.97,73.932-10.006,66.645,9.846,65.97 c66.734-2.275,95.08,10.281,85.696,45.506c-3.038,11.374-9.81,23.024-16.474,31.128c-4.266,5.545-22.802,22.996-31.012,30.132 c-18.714,16.27-37.676,32.354-54.898,50.224C28.033,282.525,4.307,322.761,2.761,369.972 C-0.225,460.627,96.419,548.2,184.924,496.679c41.782-24.322,56.71-71.16,79.903-110.534c9.668-16.431,27.564-37.801,47.789-21.212 c16.776,13.845,25.344,37.384,35.544,55.964c19.55,35.597,53.05,68.218,97.551,59.341c21.362-4.265,39.294-18.607,50.687-36.841 C499.277,438.777,515.538,409.613,506.705,405.481z"
      />
    </svg>
  );
};

const DownFlavorIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="#614900" height="1em" width="1em">
      <path d="M22 2s-7.64-.37-13.66 7.88C3.72 16.21 2 22 2 22l1.94-1c1.44-2.5 2.19-3.53 3.6-5 2.53.74 5.17.65 7.46-2-2-.56-3.6-.43-5.96-.19C11.69 12 13.5 11.6 16 12l1-2c-1.8-.34-3-.37-4.78.04C14.19 8.65 15.56 7.87 18 8l1.21-1.93c-1.56-.11-2.5.06-4.29.5 1.61-1.46 3.08-2.12 5.22-2.25 0 0 1.05-1.89 1.86-2.32z" />
    </svg>
  );
};

const StrangeFlavorIcon = () => {
  return (
    <svg
      height="1em"
      width="1em"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path
        fill="#0d9494"
        d="M462.632,283.152c23.08-38.464-7.688-76.928-30.768-50.008c-96.724,92.511-202.392,60.596-202.392,60.596 s-61.852-13.814-66.705-54.039c-9.89-82.13,42.71-104.696,42.71-165.848C205.478,33.062,172.417,0,131.634,0 C94.101,0,63.201,28.017,58.48,64.253c-9.242,9.55-29.197,28.798-43.384,32.671c-18.334,5.003,17.894,17.968,56.15,15.849 c17.013,23.454,28.698,36.536,4.986,119.232c-61.518,158.401,60.356,269.944,160.255,278.862 C451.886,530.1,501.096,297.995,501.096,297.995C504.943,266.679,493.408,248.536,462.632,283.152z"
      ></path>
    </svg>
  );
};

const TopFlavorIcon = () => {
  return (
    <svg
      height="1em"
      width="1em"
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      fill="#000000"
      enableBackground="new 0 0 1000 1000"
    >
      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
        <path
          fill="black"
          d="M4121.6,5048.5c-320.1-20.7-864.9-92.9-1161.8-154.9c-681.6-142-1161.8-366.6-1456.1-681.6c-253-271.1-276.3-462.1-108.4-952.7c191-557.7,289.2-1546.4,340.8-3402.7c20.6-740.9,33.6-704.8-281.4-862.3c-562.8-281.4-1040.4-697.1-1216-1055.9C112.2-2319.8,76-2523.7,114.8-2763.8c160.1-1037.9,1698.8-1812.4,4045.6-2039.6c436.3-41.3,1608.4-41.3,2052.5,2.6c725.4,67.1,1502.6,232.4,2026.6,428.6c534.4,201.4,885.5,413.1,1192.8,722.9c431.2,436.3,568,960.4,395,1512.9c-144.6,472.5-560.2,893.3-1166.9,1185c-157.5,77.5-242.7,103.3-335.6,103.3c-67.1,0-123.9-10.3-123.9-23.2c0-12.9,43.9-196.2,95.5-407.9c85.2-338.2,95.5-418.2,98.1-704.8c0-304.6-5.2-330.4-74.9-472.5c-180.7-369.2-619.6-648-1314.1-831.3c-562.8-149.7-1613.6-296.9-1732.3-242.7c-87.8,41.3-154.9,185.9-126.5,273.7c49,142,105.8,157.5,679,188.5c808.1,41.3,1200.5,111,1538.7,271.1c253,121.3,426,284,537,503.4c136.8,276.3,157.5,454.4,123.9,1123c-54.2,1055.9-62,1469-33.6,2044.8c54.2,1071.4,144.6,1626.5,415.6,2592c59.4,206.5,80,322.7,67.1,374.4c-10.3,46.5-100.7,157.5-229.8,281.4c-167.8,165.2-268.5,237.5-469.9,340.8c-524.1,268.5-1179.9,438.9-2052.5,539.6C5399.6,5038.1,4436.6,5066.5,4121.6,5048.5z M2340.2,3579.5c413.1-154.9,1089.5-325.3,1600.7-402.7c335.6-51.6,503.4-59.4,1045.6-62c1027.5,0,1753,136.8,2586.9,493.1c294.3,126.5,315,129.1,418.3,74.9c82.6-41.3,105.8-85.2,105.8-204c0-118.8-38.7-157.5-268.5-263.3c-1355.4-622.2-3147.1-746.1-4794.3-333C2384.1,3047.6,1829,3249,1746.4,3352.3c-74.9,98.1-67.1,203.9,25.8,296.9C1870.3,3747.3,1906.5,3742.1,2340.2,3579.5z"
        ></path>
      </g>
    </svg>
  );
};

const UpFlavorIcon = () => {
  return (
    <svg
      fill="#6fc4e7"
      viewBox="0 0 24.818 29.681"
      height="1em"
      width="1em"
      preserveAspectRatio="xMinYMin"
    >
      <path d="M24.754,13.371l-5.615-11.65c-0.284-0.589-0.819-1.046-1.481-1.264c-0.658-0.218-1.387-0.177-2.014,0.115l-1.253,0.47 C14.295,1.086,14,1.179,14,1.278c0,0.001,0,0.002,0,0.002c0,2.036-0.912,3.767-2,3.767s-2-1.73-2-3.767c0,0,0-0.001,0-0.002 c0-0.1,0.114-0.192,0.019-0.236l-0.947-0.47C8.445,0.28,7.768,0.239,7.109,0.457C6.447,0.675,5.938,1.132,5.654,1.721l-5.602,11.65 c-0.163,0.34-0.001,0.739,0.36,0.906l1.525,0.707c0.179,0.082,0.388,0.097,0.58,0.039s0.35-0.185,0.44-0.349L7.06,7.182 c0.991,2.225,1.089,4.71,0.238,6.999l-3.521,7.958c1.719,0.367,4.634,0.542,8.627,0.542l0,0c0.002,0,0.005,0,0.007,0 s0.005,0,0.007,0l0,0c3.993,0,6.908-0.175,8.626-0.542l-3.521-8.049c-0.852-2.289-0.754-4.729,0.237-6.953l4.103,7.516 c0.09,0.164,0.248,0.303,0.439,0.36s0.399,0.048,0.578-0.033l1.521-0.704C24.762,14.107,24.917,13.711,24.754,13.371z" />
      <path d="M12.41,25.681c0.002,0,0.005,0,0.007,0l0,0c4.992,0,8.329-0.634,9.591-1.063l-0.563-1.325 c-2.949,0.684-7.033,0.758-9.035,0.771c-2.002-0.013-6.086-0.113-9.035-0.797l-0.563,1.355c1.263,0.429,4.6,1.06,9.592,1.06l0,0 C12.405,25.681,12.408,25.681,12.41,25.681z"></path>{" "}
      <path d="M12.41,27.544c-3.001-0.015-7.892-0.223-10.388-1.171c0,0-0.695,1.463-0.695,1.545c0,1.012,5.082,1.763,11.076,1.763l0,0 c0.002,0,0.005,0,0.007,0s0.005,0,0.007,0l0,0c5.994,0,11.076-0.751,11.076-1.763c0-0.082-0.695-1.598-0.695-1.598 C20.301,27.269,15.41,27.529,12.41,27.544z"></path>
    </svg>
  );
};
