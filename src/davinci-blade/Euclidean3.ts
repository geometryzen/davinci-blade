import Measure = require('davinci-blade/Measure');
import Unit = require('davinci-blade/Unit');

function Euclidean3Error(message: string) {
  this.name = 'Euclidean3Error';
  this.message = (message || "")
}
Euclidean3Error.prototype = new Error();

function assertArgNumber(name: string, x: number): number {
  if (typeof x === 'number') {
    return x;
  }
  else {
    throw new Euclidean3Error("Argument '" + name + "' must be a number");
  }
}

function assertArgEuclidean3(name: string, arg: Euclidean3): Euclidean3 {
  if (arg instanceof Euclidean3) {
    return arg;
  }
  else {
    throw new Euclidean3Error("Argument '" + arg + "' must be a Euclidean3");
  }
}

function assertArgUnitOrUndefined(name: string, uom: Unit): Unit {
  if (typeof uom === 'undefined' || uom instanceof Unit) {
    return uom;
  }
  else {
    throw new Euclidean3Error("Argument '" + uom + "' must be a Unit or undefined");
  }
}

function compute(
  f: (x0: number, x1: number, x2: number, x3: number, x4: number, x5: number, x6: number, x7: number, y0: number, y1: number, y2: number, y3: number, y4: number, y5: number, y6: number, y7: number, index: number) => number,
  a: number[],
  b: number[],
  coord: (m: number[], index: number) => number,
  pack: (x0: number, x1: number, x2: number, x3: number, x4: number, x5: number, x6: number, x7: number, uom: Unit) => Euclidean3,
  uom: Unit): Euclidean3 {
    var a0 = coord(a, 0);
    var a1 = coord(a, 1);
    var a2 = coord(a, 2);
    var a3 = coord(a, 3);
    var a4 = coord(a, 4);
    var a5 = coord(a, 5);
    var a6 = coord(a, 6);
    var a7 = coord(a, 7);
    var b0 = coord(b, 0);
    var b1 = coord(b, 1);
    var b2 = coord(b, 2);
    var b3 = coord(b, 3);
    var b4 = coord(b, 4);
    var b5 = coord(b, 5);
    var b6 = coord(b, 6);
    var b7 = coord(b, 7);
    var x0 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 0);
    var x1 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 1);
    var x2 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 2);
    var x3 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 3);
    var x4 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 4);
    var x5 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 5);
    var x6 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 6);
    var x7 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 7);
    return pack(x0, x1, x2, x3, x4, x5, x6, x7, uom);
}

function addE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
  a0 = +a0;
  a1 = +a1;
  a2 = +a2;
  a3 = +a3;
  a4 = +a4;
  a5 = +a5;
  a6 = +a6;
  a7 = +a7;
  b0 = +b0;
  b1 = +b1;
  b2 = +b2;
  b3 = +b3;
  b4 = +b4;
  b5 = +b5;
  b6 = +b6;
  b7 = +b7;
  index = index | 0;
  var x = 0.0;
  switch (~(~index)) {
      case 0: {
          x = +(a0 + b0);
      }
      break;
      case 1: {
          x = +(a1 + b1);
      }
      break;
      case 2: {
          x = +(a2 + b2);
      }
      break;
      case 3: {
          x = +(a3 + b3);
      }
      break;
      case 4: {
          x = +(a4 + b4);
      }
      break;
      case 5: {
          x = +(a5 + b5);
      }
      break;
      case 6: {
          x = +(a6 + b6);
      }
      break;
      case 7: {
          x = +(a7 + b7);
      }
      break;
      default: {
        throw new Euclidean3Error("index must be in the range [0..7]");
      }
  }
  return +x;
}

function subE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 - b0);
        }
            break;
        case 1: {
            x = +(a1 - b1);
        }
            break;
        case 2: {
            x = +(a2 - b2);
        }
            break;
        case 3: {
            x = +(a3 - b3);
        }
            break;
        case 4: {
            x = +(a4 - b4);
        }
            break;
        case 5: {
            x = +(a5 - b5);
        }
            break;
        case 6: {
            x = +(a6 - b6);
        }
            break;
        case 7: {
            x = +(a7 - b7);
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

/**
 * 
 */
function mulE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
        }
            break;
        case 1: {
            x = +(a0 * b1 + a1 * b0 - a2 * b4 + a3 * b6 + a4 * b2 - a5 * b7 - a6 * b3 - a7 * b5);
        }
            break;
        case 2: {
            x = +(a0 * b2 + a1 * b4 + a2 * b0 - a3 * b5 - a4 * b1 + a5 * b3 - a6 * b7 - a7 * b6);
        }
            break;
        case 3: {
            x = +(a0 * b3 - a1 * b6 + a2 * b5 + a3 * b0 - a4 * b7 - a5 * b2 + a6 * b1 - a7 * b4);
        }
            break;
        case 4: {
            x = +(a0 * b4 + a1 * b2 - a2 * b1 + a3 * b7 + a4 * b0 - a5 * b6 + a6 * b5 + a7 * b3);
        }
            break;
        case 5: {
            x = +(a0 * b5 + a1 * b7 + a2 * b3 - a3 * b2 + a4 * b6 + a5 * b0 - a6 * b4 + a7 * b1);
        }
            break;
        case 6: {
            x = +(a0 * b6 - a1 * b3 + a2 * b7 + a3 * b1 - a4 * b5 + a5 * b4 + a6 * b0 + a7 * b2);
        }
            break;
        case 7: {
            x = +(a0 * b7 + a1 * b5 + a2 * b6 + a3 * b4 + a4 * b3 + a5 * b1 + a6 * b2 + a7 * b0);
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

function scpE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
        }
            break;
        case 1: {
            x = 0;
        }
            break;
        case 2: {
            x = 0;
        }
            break;
        case 3: {
            x = 0;
        }
            break;
        case 4: {
            x = 0;
        }
            break;
        case 5: {
            x = 0;
        }
            break;
        case 6: {
            x = 0;
        }
            break;
        case 7: {
            x = 0;
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

function extE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 * b0);
        }
            break;
        case 1: {
            x = +(a0 * b1 + a1 * b0);
        }
            break;
        case 2: {
            x = +(a0 * b2 + a2 * b0);
        }
            break;
        case 3: {
            x = +(a0 * b3 + a3 * b0);
        }
            break;
        case 4: {
            x = +(a0 * b4 + a1 * b2 - a2 * b1 + a4 * b0);
        }
            break;
        case 5: {
            x = +(a0 * b5 + a2 * b3 - a3 * b2 + a5 * b0);
        }
            break;
        case 6: {
            x = +(a0 * b6 - a1 * b3 + a3 * b1 + a6 * b0);
        }
            break;
        case 7: {
            x = +(a0 * b7 + a1 * b5 + a2 * b6 + a3 * b4 + a4 * b3 + a5 * b1 + a6 * b2 + a7 * b0);
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

function lcoE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
        }
            break;
        case 1: {
            x = +(a0 * b1 - a2 * b4 + a3 * b6 - a5 * b7);
        }
            break;
        case 2: {
            x = +(a0 * b2 + a1 * b4 - a3 * b5 - a6 * b7);
        }
            break;
        case 3: {
            x = +(a0 * b3 - a1 * b6 + a2 * b5 - a4 * b7);
        }
            break;
        case 4: {
            x = +(a0 * b4 + a3 * b7);
        }
            break;
        case 5: {
            x = +(a0 * b5 + a1 * b7);
        }
            break;
        case 6: {
            x = +(a0 * b6 + a2 * b7);
        }
            break;
        case 7: {
            x = +(a0 * b7);
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

function rcoE3(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number, b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number, b7: number, index: number): number {
    a0 = +a0;
    a1 = +a1;
    a2 = +a2;
    a3 = +a3;
    a4 = +a4;
    a5 = +a5;
    a6 = +a6;
    a7 = +a7;
    b0 = +b0;
    b1 = +b1;
    b2 = +b2;
    b3 = +b3;
    b4 = +b4;
    b5 = +b5;
    b6 = +b6;
    b7 = +b7;
    index = index | 0;
    var x = 0.0;
    switch (~(~index)) {
        case 0: {
            x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
        }
            break;
        case 1: {
            x = +(+ a1 * b0 + a4 * b2 - a6 * b3 - a7 * b5);
        }
            break;
        case 2: {
            x = +(+ a2 * b0 - a4 * b1 + a5 * b3 - a7 * b6);
        }
            break;
        case 3: {
            x = +(+ a3 * b0 - a5 * b2 + a6 * b1 - a7 * b4);
        }
            break;
        case 4: {
            x = +(+ a4 * b0 + a7 * b3);
        }
            break;
        case 5: {
            x = +(+ a5 * b0 + a7 * b1);
        }
            break;
        case 6: {
            x = +(+ a6 * b0 + a7 * b2);
        }
            break;
        case 7: {
            x = +(+ a7 * b0);
        }
            break;
        default: {
            throw new Euclidean3Error("index must be in the range [0..7]");
        }
    }
    return +x;
}

var divide = function(
  a000: number,
  a001: number,
  a010: number,
  a011: number, a100, a101, a110, a111, b000, b001, b010, b011, b100, b101, b110, b111, uom: Unit, dst?: Euclidean3) {
    var c000, c001, c010, c011, c100, c101, c110, c111, i000, i001, i010, i011, i100, i101, i110, i111, k000, m000, m001, m010, m011, m100, m101, m110, m111, r000, r001, r010, r011, r100, r101, r110, r111, s000, s001, s010, s011, s100, s101, s110, s111, w, x, x000, x001, x010, x011, x100, x101, x110, x111, xy, xyz, y, yz, z, zx;

    r000 = +b000;
    r001 = +b001;
    r010 = +b010;
    r011 = -b011;
    r100 = +b100;
    r101 = -b101;
    r110 = -b110;
    r111 = -b111;
    m000 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 0);
    m001 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 1);
    m010 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 2);
    m011 = 0;
    m100 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 3);
    m101 = 0;
    m110 = 0;
    m111 = 0;
    c000 = +m000;
    c001 = -m001;
    c010 = -m010;
    c011 = -m011;
    c100 = -m100;
    c101 = -m101;
    c110 = -m110;
    c111 = +m111;
    s000 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 0);
    s001 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 1);
    s010 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 2);
    s011 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 4);
    s100 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 3);
    s101 = -mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 6);
    s110 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 5);
    s111 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 7);
    k000 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, s000, s001, s010, s100, s011, s110, -s101, s111, 0);
    i000 = s000 / k000;
    i001 = s001 / k000;
    i010 = s010 / k000;
    i011 = s011 / k000;
    i100 = s100 / k000;
    i101 = s101 / k000;
    i110 = s110 / k000;
    i111 = s111 / k000;
    x000 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 0);
    x001 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 1);
    x010 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 2);
    x011 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 4);
    x100 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 3);
    x101 = -mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 6);
    x110 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 5);
    x111 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 7);
    w = x000;
    x = x001;
    y = x010;
    z = x100;
    xy = x011;
    yz = x110;
    zx = -x101;
    xyz = x111;
    if (typeof dst !== 'undefined') {
      dst.w = w;
      dst.x = x;
      dst.y = y;
      dst.z = z;
      dst.xy = xy;
      dst.yz = yz;
      dst.zx = zx;
      dst.xyz = xyz;
      dst.uom = uom;
    }
    else {
      return new Euclidean3(w, x, y, z, xy, yz, zx, xyz, uom);
    }
};

function stringFromCoordinates(
  coordinates: number[],
  numberToString: (x: number) => string,
  labels: string[]
  ): string {
    var i: number, _i: number, _ref: number;
    var str: string;
    var sb: string[] = [];
    var append = function(coord: number, label: string): void {
        var n;
        if (coord !== 0) {
            if (coord >= 0) {
                if (sb.length > 0) {
                    sb.push("+");
                }
            } else {
                sb.push("-");
            }
            n = Math.abs(coord);
            if (n === 1) {
                sb.push(label);
            } else {
                sb.push(numberToString(n));
                if (label !== "1") {
                    sb.push("*");
                    sb.push(label);
                }
            }
        }
    };
    for (i = _i = 0, _ref = coordinates.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        append(coordinates[i], labels[i]);
    }
    if (sb.length > 0) {
        str = sb.join("");
    } else {
        str = "0";
    }
    return str;
}

/**
 * The Euclidean3 class represents a multivector for a 3-dimensional vector space with a Euclidean metric.
 * @class Euclidean3
 */
class Euclidean3 implements Measure<Euclidean3> {
    /**
     * The `w` property is the grade zero (scalar) part of the Euclidean3 multivector.
     */
    public w: number;
    /**
     * The `x` property is the x coordinate of the grade one (vector) part of the Euclidean3 multivector.
     */
    public x: number;
    /**
     * The `y` property is the y coordinate of the grade one (vector) part of the Euclidean3 multivector.
     */
    public y: number;
    /**
     * The `z` property is the z coordinate of the grade one (vector) part of the Euclidean3 multivector.
     */
    public z: number;
    /**
     * The `xy` property is the xy coordinate of the grade two (bivector) part of the Euclidean3 multivector.
     */
    public xy: number;
    /**
     * The `yz` property is the yz coordinate of the grade two (bivector) part of the Euclidean3 multivector.
     */
    public yz: number;
    /**
     * The `zx` property is the zx coordinate of the grade two (bivector) part of the Euclidean3 multivector.
     */
    public zx: number;
    /**
     * The `xyz` property is the grade three (pseudoscalar) part of the Euclidean3 multivector.
     */
    public xyz: number;
    /**
     * The optional unit of measure.
     */
    public uom: Unit;
    /**
     * Constructs a Euclidean3 from its coordinates.
     * @constructor
     * @param {number} w The scalar part of the multivector.
     * @param {number} x The vector component of the multivector in the x-direction.
     * @param {number} y The vector component of the multivector in the y-direction.
     * @param {number} z The vector component of the multivector in the z-direction.
     * @param {number} xy The bivector component of the multivector in the xy-plane.
     * @param {number} yz The bivector component of the multivector in the yz-plane.
     * @param {number} zx The bivector component of the multivector in the zx-plane.
     * @param {number} xyz The pseudoscalar part of the multivector.
     * @param uom The optional unit of measure.
     */
    constructor(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number, uom: Unit) {
      this.w = assertArgNumber('w', w);
      this.x = assertArgNumber('x', x);
      this.y = assertArgNumber('y', y);
      this.z = assertArgNumber('z', z);
      this.xy = assertArgNumber('xy', xy);
      this.yz = assertArgNumber('yz', yz);
      this.zx = assertArgNumber('zx', zx);
      this.xyz = assertArgNumber('xyz', xyz);
      this.uom = assertArgUnitOrUndefined('uom', uom);
      if (this.uom && this.uom.scale !== 1) {
        var scale: number = this.uom.scale;
        this.w *= scale;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.xy *= scale;
        this.yz *= scale;
        this.zx *= scale;
        this.xyz *= scale;
        this.uom = new Unit(1, uom.dimensions, uom.labels);
      }
    }

    static fromCartesian(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number, uom: Unit): Euclidean3 {
      assertArgNumber('w', w);
      assertArgNumber('x', x);
      assertArgNumber('y', y);
      assertArgNumber('z', z);
      assertArgNumber('xy', xy);
      assertArgNumber('yz', yz);
      assertArgNumber('zx', zx);
      assertArgNumber('xyz', xyz);
      assertArgUnitOrUndefined('uom', uom);
      return new Euclidean3(w, x, y, z, xy, yz, zx, xyz, uom);
    }

    coordinates(): number[] {
      return [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz];
    }

    coordinate(index: number): number {
      assertArgNumber('index', index);
      switch (index) {
        case 0:
          return this.w;
        case 1:
          return this.x;
        case 2:
          return this.y;
        case 3:
          return this.z;
        case 4:
          return this.xy;
        case 5:
          return this.yz;
        case 6:
          return this.zx;
        case 7:
          return this.xyz;
        default:
          throw new Euclidean3Error("index must be in the range [0..7]");
      }
    }

    add(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number, uom: Unit): Euclidean3 {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(addE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.compatible(this.uom, rhs.uom));
    }

    __add__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.add(other);
      }
      else if (typeof other === 'number') {
        return this.add(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __radd__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.add(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).add(this);
      }
    }

    sub(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w, x, y, z, xy, yz, zx, xyz, uom: Unit): Euclidean3 {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(subE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.compatible(this.uom, rhs.uom));
    }

    __sub__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.sub(other);
      }
      else if (typeof other === 'number') {
        return this.sub(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rsub__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.sub(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).sub(this);
      }
    }

    mul(rhs: any): Euclidean3
    {
      if (typeof rhs === 'number')
      {
        return this.scalarMultiply(rhs);
      }
      else
      {
        var coord = function(x: number[], n: number): number {return x[n];};
        var pack = function(w, x, y, z, xy, yz, zx, xyz, uom: Unit) {return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);};
        return compute(mulE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.mul(this.uom, rhs.uom));
      }
    }

    __mul__(other: any): any
    {
      if (other instanceof Euclidean3)
      {
        return this.mul(other);
      }
      else if (typeof other === 'number')
      {
        return this.mul(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rmul__(other: any): any
    {
      if (other instanceof Euclidean3)
      {
        return other.mul(this);
      }
      else if (typeof other === 'number')
      {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).mul(this);
      }
    }

    scalarMultiply(rhs: number): Euclidean3 {
      return new Euclidean3(this.w * rhs, this.x * rhs, this.y * rhs, this.z * rhs, this.xy * rhs, this.yz * rhs, this.zx * rhs, this.xyz * rhs, this.uom);
    }

    div(rhs: Euclidean3): Euclidean3 {
      assertArgEuclidean3('rhs', rhs);
      return divide(this.w, this.x, this.y, this.xy, this.z, -this.zx, this.yz, this.xyz, rhs.w, rhs.x, rhs.y, rhs.xy, rhs.z, -rhs.zx, rhs.yz, rhs.xyz, Unit.div(this.uom,rhs.uom));
    }

    __div__(other: any): Euclidean3
    {
      if (other instanceof Euclidean3)
      {
        return this.div(other);
      }
      else if (typeof other === 'number')
      {
        return this.div(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rdiv__(other: any): Euclidean3
    {
      if (other instanceof Euclidean3)
      {
        return other.div(this);
      }
      else if (typeof other === 'number')
      {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).div(this);
      }
    }

    splat(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w, x, y, z, xy, yz, zx, xyz, uom: Unit): Euclidean3 {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(scpE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.mul(this.uom, rhs.uom));
    }

    wedge(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number, uom: Unit): Euclidean3 {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(extE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.mul(this.uom, rhs.uom));
    }

    __vbar__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.splat(other);
      }
      else if (typeof other === 'number') {
        return this.splat(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rvbar__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.splat(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).splat(this);
      }
    }

    __wedge__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.wedge(other);
      }
      else if (typeof other === 'number') {
        return this.wedge(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rwedge__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.wedge(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).wedge(this);
      }
    }

    lshift(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number, uom: Unit) {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(lcoE3, this.coordinates(), rhs.coordinates(), coord, pack, Unit.mul(this.uom, rhs.uom));
    }

    __lshift__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.lshift(other);
      }
      else if (typeof other === 'number') {
        return this.lshift(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rlshift__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.lshift(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).lshift(this);
      }
    }

    rshift(rhs: Euclidean3): Euclidean3 {
      var coord = function(x: number[], n: number): number {
        return x[n];
      };
      var pack = function(w, x, y, z, xy, yz, zx, xyz, uom: Unit) {
        return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz, uom);
      };
      return compute(rcoE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack, Unit.mul(this.uom, rhs.uom));
    }

    __rshift__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return this.rshift(other);
      }
      else if (typeof other === 'number') {
        return this.rshift(new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined));
      }
    }

    __rrshift__(other: any): Euclidean3 {
      if (other instanceof Euclidean3) {
        return other.rshift(this);
      }
      else if (typeof other === 'number') {
        return new Euclidean3(other, 0, 0, 0, 0, 0, 0, 0, undefined).rshift(this);
      }
    }

    __pos__(): Euclidean3 {
      return this;
    }

    __neg__(): Euclidean3 {
      return new Euclidean3(-this.w, -this.x, -this.y, -this.z, -this.xy, -this.yz, -this.zx, -this.xyz, this.uom);
    }

    /**
     * ~ (tilde) produces reversion.
     */
    __tilde__(): Euclidean3 {
      return new Euclidean3(this.w, this.x, this.y, this.z, -this.xy, -this.yz, -this.zx, -this.xyz, this.uom);
    }

    grade(index: number): Euclidean3 {
      assertArgNumber('index', index);
      switch (index) {
        case 0:
          return Euclidean3.fromCartesian(this.w, 0, 0, 0, 0, 0, 0, 0, this.uom);
        case 1:
          return Euclidean3.fromCartesian(0, this.x, this.y, this.z, 0, 0, 0, 0, this.uom);
        case 2:
          return Euclidean3.fromCartesian(0, 0, 0, 0, this.xy, this.yz, this.zx, 0, this.uom);
        case 3:
          return Euclidean3.fromCartesian(0, 0, 0, 0, 0, 0, 0, this.xyz, this.uom);
        default:
          return Euclidean3.fromCartesian(0, 0, 0, 0, 0, 0, 0, 0, this.uom);
      }
    }

    // FIXME: This should return a Euclidean3
    dot(vector: Euclidean3): number {
      return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector: Euclidean3): Euclidean3 {
        var x, x1, x2, y, y1, y2, z, z1, z2;

        x1 = this.x;
        y1 = this.y;
        z1 = this.z;
        x2 = vector.x;
        y2 = vector.y;
        z2 = vector.z;
        x = y1 * z2 - z1 * y2;
        y = z1 * x2 - x1 * z2;
        z = x1 * y2 - y1 * x2;
        return new Euclidean3(0, x, y, z, 0, 0, 0, 0, Unit.mul(this.uom, vector.uom));
    }

    length() {
      return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz);
    }

    exp(): Euclidean3 {
      throw new Euclidean3Error('exp');
    }

    /**
     * Computes the magnitude of this Euclidean3. The magnitude is the square root of the quadrance.
     */
    norm(): Euclidean3 {return new Euclidean3(Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz), 0, 0, 0, 0, 0, 0, 0, this.uom);}

    /**
     * Computes the quadrance of this Euclidean3. The quadrance is the square of the magnitude.
     */
    quad(): Euclidean3 {return new Euclidean3(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz, 0, 0, 0, 0, 0, 0, 0, Unit.mul(this.uom, this.uom));}

    sqrt() {return new Euclidean3(Math.sqrt(this.w), 0, 0, 0, 0, 0, 0, 0, Unit.sqrt(this.uom));}

    toStringCustom(
      coordToString: (x: number) => string,
      labels: string[]): string {
      var quantityString: string = stringFromCoordinates(this.coordinates(), coordToString, labels);
      if (this.uom) {
        var unitString = this.uom.toString().trim();
        if (unitString) {
          return quantityString + ' ' + unitString;
        }
        else {
          return quantityString;
        }
      }
      else {
        return quantityString;
      }
    }

    toExponential(): string {
      var coordToString = function(coord: number): string { return coord.toExponential() };
      return this.toStringCustom(coordToString, ["1", "e1", "e2", "e3", "e12", "e23", "e31", "e123"]);
    }

    toFixed(digits?: number): string {
      assertArgNumber('digits', digits);
      var coordToString = function(coord: number): string { return coord.toFixed(digits) };
      return this.toStringCustom(coordToString, ["1", "e1", "e2", "e3", "e12", "e23", "e31", "e123"]);
    }

    toString(): string {
      var coordToString = function(coord: number): string { return coord.toString() };
      return this.toStringCustom(coordToString, ["1", "e1", "e2", "e3", "e12", "e23", "e31", "e123"]);
    }

    toStringIJK(): string {
      var coordToString = function(coord: number): string { return coord.toString() };
      return this.toStringCustom(coordToString, ["1", "i", "j", "k", "ij", "jk", "ki", "I"]);
    }

    toStringLATEX(): string {
      var coordToString = function(coord: number): string { return coord.toString() };
      return this.toStringCustom(coordToString, ["1", "e_{1}", "e_{2}", "e_{3}", "e_{12}", "e_{23}", "e_{31}", "e_{123}"]);
    }
}

export = Euclidean3;