import HeaderBg from '../assests/header_bg.jpg';
import VaccumForming from '../assests/vacuum_forming.jpg';

function createData(name, materials, applications, pros, cons) {
    return { name, materials, applications, pros, cons };
}

export const ThreeDPrinting = {
    rows: [
        createData(
            'FDM',
            'ABS, PLA, TPU rubber, PET, PETG, Nylon, PC',
            'Engineering and industrial prototypes, presentation models, architectural models',
            'Low cost technology; Easy operation; Strong parts',
            'Rough surface finish; Slow printing speed;'
        ),
        createData(
            'SLA/DLP',
            'Standard Resin, castable/wax resin, dental resin',
            'Jewellery, art and craft, dental and medical sector',
            'High Details in printing;Smooth surface finish;Medical grade printing',
            'Material limitations; Post-processing required after prints'
        ),
        createData(
            'SLS',
            'Nylon, Flexible rubber',
            'Complex parts like automotive parts, prosthetic, etc',
            'Supportless printing; High chemical and heat resistant',
            'Expensive technology; High operational cost'
        ),
    ],
    image: HeaderBg,
    tableHead: [
        '3D Printing Technology',
        'Materials',
        'Applications',
        'Pros',
        'Cons',
    ],

    description:
        '3D Printing, also termed as an additive manufacturing is the process of making physical objects/products through layer wise addition of melted material directly from the computer aided 3D designs.' +
        'There is no necessity of investing in additional tools or die/mold in the 3D printing manufacturing process. A desired product is first modelled in a 3D CAD software, exported in acceptable file formats (usually .obj, .stl) and sent to a 3D printing slicer software which converts design into machine supported codes and a 3D printer makes the product in real physical form.' +
        'Most popular 3D printing technologies are the FDM 3D printers (Plastic/rubber filament as raw material), SLA/DLP 3D printers (liquid resins as raw material and laser/light source for binding layers) and SLS 3D Printer technologies (polymer or metal power as raw material and laser source).',
};

export const VacumForming = {
    description:
        'Vacuum forming is a digital manufacturing process which involves heating specific sheets of plastic to required forming temperature and stretching and pulling them onto the surface of the mold placed in the bed using vacuum suction. Forming involves shaping plastic to that of the mold. Vacuum forming is the simple type of plastic thermoforming that uses vacuum pressure to get the required parts mold with desired details and geometry.' +
        'It uses a portal in the home vacuum machine for creating suction under the bed. When the plastic sheet is heated the sheet is pulled down stretching over the mold above the bed. The suction starts pulling the sheets and forming the desired shape in the sheet.' +
        'The templates used for vacuum forming are usually 3D printed parts or real life products. The thing to consider is that the material packing of these templates needs to be tight.' +
        'The major applications are the: prototyping industries, product packaging, chocolate dies, Medical packaging: pharmaceutical trays pills are packaged: MRI and CT machine exterior pieces.' +
        'Materials for Casting in the mount: Plaster of Paris, Resin, Jesmonite, Concrete, Chocolate, Silicone, Wax.',

    image: VaccumForming,
};
