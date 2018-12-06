
// window.addEventListener ("load", myMain, false);

// function myMain (evt) {
//     console.log("currentPage", window.currentPage);
// }

var script = document.createElement('script');
script.innerHTML = `
    var articleId = window.currentPage.articleId;
    console.log('articleId', articleId);

    document.cookie = "_session_id=US9wa2xTMisvTDJHSmgzTiswa0NlVnZrZWdHQTNHekxmZHpkMG1jb3I4OHM3S3BCMSs2bXNhZXo5WVdyQks1K0FjbXdmT0ZGZERwMjJaODVwMVFEdUpjejBVd2ZKUnpJVFh2YU1iS2FuWG81TTU5Q3VlWlhVL1VpMnFkSThKTEVPV281TFJOeUtDSUErY3JMaW5wRDhHQUdtb0luVjVSaVR6dTRRa3YwdjhROENaaHhOTGFFSk5ZbXZFOHNtTk1iK0l5L0M5SmNhb2tpakhNT0Jmekl5ZW1BR21nOEd1M0ZobkpoRDE4d0cvRkxkN09zRnlRSGlGZUphbzlKdmc4L0N6c3J6dDJ3aGJsVS8rekVMZXpVeDdiS0xUVHplamsyMDgvbitScUMxS1ArV1phMzF4eWpTMFppdkNrWmJJZ0syRlpFci9zRVJ4bkF0aXVVa05hRExLTnZhbThDME5ad1RidVo1bCs5VTE3eS8xNmF0Q090Z0p0VjJZWjk0OE80QjhNbGV0YjRqcDJvRWVGL2tGanVMWVBJbnJ3ZFdLS29UQ0dCdHNSRmJJOXFNanFLa21oa1VuTjVUZS9XUlBHSkFGVSswbTkzeDRGRXZQdE1QaUtzYnQ4WWkxTHFJazVwVGlHNGNGMjNEMmxqY0FPYVB0ajNpT0sreFg4dmlhSmJqNFZLYWQzeDBSMndEL3d0YStnMktNNnVqcmh0MEg4bGlncXlzaGwwRnBETHdJTHlSeHBFSlE3SDlva2ZDbm1FUjFZNTZ5dEU3T2NUcFRvV0hOcm1pOTR5d0t2TklYaW1PTVZzNVo1SDdHQ2V2R0NzdENRZGxwMW1hSjh3djRFKy0tMVhyVXU5bkxacFhaZmFwaWVOL2NlUT09--d84a94518161b55651120f31b5324b1ae64037b4;";

    var rand_str = Math.random().toString(36).substring(7);

    fetch("https://www.theinformation.com/share-article", {
      body: "utf8=%E2%9C%93&authenticity_token=QEgYGM6xeE8HlXIbBmg99G7MC%2BoRPKUMcFYufx4Lk2g6XUIq%2FplnhMT6guo5iggqvcFx3jEFud%2FrWZeGmXfZfg%3D%3D&lead_type=share&article_id=" + articleId + "&share_guid=dec1908e78b0d754&ref_id=149093&notes=top-paywall&email=" + rand_str + "%40mit.edu&commit=Read+Article",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      redirect: 'follow',
      mode: "cors"
    }).then(function(response) {
        // navigate to unlocked url
        window.location.href = response.url;
    });
`

document.body.appendChild(script);
