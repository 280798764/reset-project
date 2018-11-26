export default {
  uuid (len, radix) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS
    var _uuid = []
    var i
    radix = radix || chars.length

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) _uuid[i] = chars[0 | Math.random() * radix]
    } else {
      // rfc4122, version 4 form
      var r
      // rfc4122 requires these characters
      _uuid[8] = _uuid[13] = _uuid[18] = _uuid[23] = '-'
      _uuid[14] = '4'

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!_uuid[i]) {
          r = 0 | Math.random() * 16
          _uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return _uuid.join('')
  }
}
