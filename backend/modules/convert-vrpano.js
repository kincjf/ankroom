/**
 * Created by KIMSEONHO on 2015-09-17.
 * 지금은 처리하기가 귀찮아서 동기로 했음
 * 하지만 사용자가 변환때문에 짜증날 수 있기 때문에
 * 비동기로 바꾸고 변환 결과를 알려주어야 할 것 같다.
 */
var childProcess = require('child_process');
var exec = childProcess.execSync;
var spawn = childProcess.spawnSync;

var os = require('os');
var path = require('path');
var _ = require('underscore');
var env       = process.env.NODE_ENV || "development";
var config = require('../config/main')[env];

var log = require('console-log-level')({
    prefix: function () { return new Date().toISOString() },
    level: 'info'
})

var platform = os.platform();
var arch = os.arch();

var shell, scriptFile, okMsg, deleteNewline, delimeter, krpanoDirectory;

if (platform === 'linux') {
// HACK: to make our calls to exec() testable,
// support using a mock shell instead of a real shell
    shell = process.env.SHELL || 'sh';
    scriptFile = "krpanotools";
    okMsg = "echo $?";
    deleteNewline = '/\n/g';
    delimeter = ':';
    krpanoDirectory = config.krpanoDir.linux;
}
else if (platform === 'win32' && process.env.SHELL === undefined) {
    // support for Win32 outside Cygwin
    shell = process.env.COMSPEC || 'cmd.exe';

    if (arch == 'x64') {
        scriptFile = "krpanotools64.exe";
    } else if (arch == 'ia32') {        // 32bit
        scriptFile = "krpanotools32.exe";
    } else {        // arm등
        log.error("not support for " + arch);
    }

    okMsg = "echo %ERRORLEVEL%";
    deleteNewline = '/\r\n/g';
    delimeter = ';';
    krpanoDirectory = config.krpanoDir.win;
}

_.extend(process.env, { PATH : process.env.PATH + delimeter + krpanoDirectory });

/**
 * Convert spherical image to cubical image
 * Before execute, must to filtering file which is type of spherical image
 * @param imagePath
 * @returns code - 0(success), integer(fail)
 */
module.exports = function(imagePath) {
    if (!scriptFile) {
        log.error("not compatible with machine OS :  " + arch);
        return 1;
    }

    if (!imagePath) {
        log.error("must pass argument(imagePath) :  " + imagePath);
        return 1;
    }

    var makepanoArgs = ["makepano", "-config=templates/normal_custom.config"];
    var makepreviewArgs = ["makepreview", "-smooth=0"];

    makepanoArgs.push(imagePath);
    makepreviewArgs.push(imagePath);

    //var processOption = {
    //    timeout : 150000,  //ms
    //    encoding : 'utf-8',
    //    //cwd : krpanoDirectory,        // process 관점에서 바라보는 실행 경로 지정 가능
    //    env : process.env       // process 관점에서 바라보는 환경 변수
    //}

    log.debug("platform version - " + platform);
    log.debug("current working dir - " + process.cwd());

    // image 파일이 존재하는지에 대한 검증은 하지 못함
    // 이미지 파일이 존재하지 않아도 echo(stdout)로 출력됨, stderr = ""
    // process option을 변수를 선언하여 재활용 했더니 에러가 난다
    // 왜 그런지는 모르겠지만, 번거롭더라도 직접 object를 넣어주어야
    // 의도대로 잘 작동한다.
    //var msg = spawn(scriptFile, makepanoArgs, processOption);

    // run convert cubical
    var msg = spawn(scriptFile, makepanoArgs, {
        timeout : 150000,  //ms
        encoding : 'utf-8',
        env : process.env
    });

    // run make preview
    if (msg.status == 0) {
        msg = spawn(scriptFile, makepreviewArgs, {
            timeout : 150000,  //ms
            encoding : 'utf-8',
            env : process.env
        });
    }

    var code = msg.status;

    if (msg.error) {
        log.error("convert-vrpano - " + msg.error.message);
        code = 1;
    } else {
        if (msg.stderr == "") {
            code = parseInt(exec(okMsg).toString('utf-8').replace(/\r\n/g, ''), 10);
        } else {
            code = 1;
            log.error("convert-vrpano - " + msg.stderr);
        }
    }

    return code;
}
