const unitTestingTask = require('../unitTestingTask');

describe('unitTestingTask', () => {
  const date = new Date('August 19, 1975 03:05:05:90');

  test('it throws an error if format argument is not a string', () => {
    expect(unitTestingTask).toThrow('Argument `format` must be a string');
  });

  test('it throws an error if date argument is not an instance of Date or Unix Timestamp or ISODate String', () => {
    expect(() => {
      unitTestingTask('YYYY-MM-dd', null)
    }).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  });

  test('it formats date as 4-digit year if format is YYYY', () => {
    const format = 'YYYY';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('1975');
  });

  test('it returns last 2 digit of year if format is YY', () => {
    const format = 'YY';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('75');
  });

  test('it returns full name of month if format is MMMM', () => {
    const format = 'MMMM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('August');
  });

  test('it returns short name of month if format is MMM', () => {
    const format = 'MMM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Aug');
  });

  test('it returns ISO8601-compatible number of month if format is MM', () => {
    const format = 'MM';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('08');
  });

  test('it returns number of month in year without zero-padding if format is equal to M', () => {
    const format = 'M';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('8');
  });

  test('it returns full name of day if format is DDD', () => {
    const format = 'DDD';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Tuesday');
  });

  test('it returns short name of day if format is DD', () => {
    const format = 'DD';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Tue');
  });

  test('it returns min name of day if format is equal to D', () => {
    const format = 'D';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('Tu');
  });

  test('it returns zero-padded number of day in month if format is dd', () => {
    const date = new Date('August 9, 1975 03:05:05:90');
    const format = 'dd';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('09');
  });
  
  test('it returns number of day in month if format is d', () => {
    const format = 'd';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('19');
  });

  test('it formates hours to be zero-padded in 24-hr format if format is HH', () => {
    const format = 'HH';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('03');
  });
  
  test('it returns hour in 24-hr format if format is H', () => {
    const format = 'H';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('3');
  });
  
  test('it returns zero-padded hour in 12-hr format if format is hh', () => {
    const format = 'hh';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('03');
  });
  
  test('it returns hour in 12-hr format if format is h', () => {
    const format = 'h';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('3');
  });

  test('it returns zero-padded minutes if format is mm', () => {
    const format = 'mm';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('05');
  });
  
  test('it returns minutes if format is m', () => {
    const format = 'm';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('5');
  });

  test('it returns zero-padded seconds if format is ss', () => {
    const format = 'ss';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('05');
  });
  
  test('it returns seconds if format is s', () => {
    const format = 's';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('5');
  });

  test('it returns zero-padded milliseconds if format is ff', () => {
    const format = 'ff';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('090');
  });
  
  test('it returns milliseconds if format is f', () => {
    const format = 'f';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('90');
  });
  
  test('it returns AM/PM if format is A', () => {
    const date = new Date('August 9, 1975 13:05:05:90');
    const format = 'A';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('PM');
  });
  
  test('it returns am/pm if format is a', () => {
    const format = 'a';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('am');
  });

  test('it returns time-zone in ISO8601-compatible basic format if format is ZZ', () => {
    const format = 'ZZ';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('+0100');
  });
  
  test('it returns time-zone in ISO8601-compatible extended format if format is Z', () => {
    const format = 'Z';
    const formattedDate = unitTestingTask(format, date);
    expect(formattedDate).toBe('+01:00');
  });

  test('it returns date from predefined formatters storage', () => {
    unitTestingTask._formatters = {
      YYYY: function () {
        return 'formatted date';
      }
    };

    const format = 'YYYY';
    const formattedDate = unitTestingTask(format, date);
  
    expect(formattedDate).toEqual(unitTestingTask._formatters[format](date));
  });
});

test('unitTestingTask.formatters returns a list of custom formats from predefined formatters storage', () => {
  unitTestingTask._formatters = {
    testFormat1: () => {},
    testFormat2: () => {}
  };
  const customFormats = unitTestingTask.formatters();
  expect(customFormats).toEqual(['testFormat1', 'testFormat2']);
});

describe('unitTestingTask.lang', () => {
  test('it returns current language in case lang argument is not specified', () => {
    const currentLanguage = unitTestingTask.lang();
    expect(currentLanguage).toEqual('en');
  });

  test('it returns current language if options argument is not specified and it catches error', () => {
    const currentLanguage = unitTestingTask.lang('testLanguage');
    expect(currentLanguage).toEqual('en');
  });

  test('it sets current language to lang and returns it if options argument is not specified, but lang already exists in language storage', () => {
    unitTestingTask._languages['testLanguage'] = {};
    const currentLanguage = unitTestingTask.lang('testLanguage');

    expect(currentLanguage).toEqual('testLanguage');
    expect(unitTestingTask._languages.current).toBe('testLanguage');
  });

  test('it sets current language to lang, adds it to languages storage and returns it if lang and options arguments are specified', () => {
    const currentLanguage = unitTestingTask.lang('test', {});

    expect(currentLanguage).toEqual('test');
    expect(unitTestingTask._languages.current).toBe('test');
  });
});

test('unitTestingTask.register returns formatting function which formats date by calling unitTestingTask', () => {
  unitTestingTask._formatters = {
    YYYY: function () {
      return 'formatted date';
    }
  };
  const date = new Date();
  const formattingFunction = unitTestingTask.register('YYYY', 'YYYY-MM-dd');
  const formattedDate = formattingFunction(date);

  expect(formattedDate).toBe(unitTestingTask('YYYY-MM-dd', date));
});

test('unitTestingTask.noConflict returns unitTestingTask itself', () => {
  const result = unitTestingTask.noConflict();
  
  expect(result).toBe(unitTestingTask);
});
