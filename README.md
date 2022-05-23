# mockup-generator

Generate Printful mockups with ease using this CLI tool!

## Why?

While Printful's GUI for generating mockups is powerful enough, their API is quite cumbersome. Furthermore, standard mockups created in a Printful shop are jpg only. In otherwords, you won't have transparency. This tool uses .png images by default and is a good choice if you want to generate some clean mockups for your shop.

Note that this tool only supports mockup generations for the product "Unisex Organic Cotton T-Shirt | Stanley/Stella STTU755", which is currently only available in the european regions of Printful. See the TODO section below that seeks to address this.

## Get started

**IMPORTANT, BEFORE DOING ANYTHING ELSE**: Ensure the variable `PRINTFUL_API_TOKEN` is set and present and in your environment!!! (This tool needs `process.env.PRINTFUL_API_TOKEN` to be set and be a valid Printful API token.)

From there, usage is as the `mockup-generator --help` shows:

```shell
USAGE
  $ mockup-generator generate -i <value> -o <value> -c <value> -t <value>

FLAGS
  -c, --colors=<value>       (required) colors of each mockup to generate, comma separated. Current acceptable
                             values include: black, french-navy, dark-heather-gray, burgundy, red, anthracite,
                             stargazer, dark-heather-blue, sage, dessert-dust, heather-gray, and white.
  -i, --input-urls=<value>   (required) urls of each source file, comma separated.
  -o, --output-path=<value>  (required) path to output folder
  -t, --top=<value>          (required) top margin for print.
```

## Example Usage

Generate mockup pictures for all currently available colors, top of graphic starts at 150px:

```shell
mockup-generator generate -i https://mycoolsite.com/somepicture.png -t 150 -o /absolute/path/to/your/desired/output/folder -c black,french-navy,dark-heather-gray,burgundy,red,anthracite,stargazer,dark-heather-blue,sage,dessert-dust,heather-gray,white
```

Generate mockup pictures for red colored shirt only, top of graphic set to 0px:

```shell
mockup-generator generate -i https://mycoolsite.com/somepicture.png -t 0 -o /absolute/path/to/your/desired/output/folder -c red
```

## TODO

- More location setting flags (`width` and `left` properties)
- More printful product & variant support (for all regions eventually)
